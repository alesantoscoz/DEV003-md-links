const fs = require('fs'); //file system
const path = require('path'); //dirección (ruta)
const direc = 'C:/Users/51940/Desktop/LABORATORIA/PROYECTO_4/DEV003-md-links/carpeta' ;// direccion de prueba

const validPath = (direc) => fs.existsSync(direc); //validar que la dirección existe
const isAbs = (direc) => path.isAbsolute(direc);//validar si es absoluta o relativa
const isDirectory = (direc) => fs.statSync(direc).isDirectory(); //validar si es directorio
const readDir = (direc) => fs.readdirSync(direc); //Recorre la carpeta
const isFile = (direc) => fs.statSync(direc).isFile(); //valida si es archivo
const extMd = (direc) => path.extname(direc) === '.md'; //validar extensión de archivo
const turningAbs = (direc) => path.join(__dirname, direc); //transformando a absoluta
const readingFile = (direc) => fs.readFileSync(direc, 'utf8'); // lectura de archivo

//Creando función para transformar ruta relativa
function turningPathAbs(direc) {
  if(validPath(direc)) { //si la ruta es válida
    if(!isAbs(direc)) { //si la ruta no es absoluta
      return turningAbs(direc); //convierte la ruta en absoluta
    }
    else { //si la ruta es absoluta
      return direc //retorna la ruta absoluta
    }
  }
  else
    return 'La ruta ingresada no existe. Por favor ingresa una ruta válida.'
};

/*function readingPath(direc) {
    if(validPath(direc)){ //si la ruta es válida
        if(isFile(direc)){ //verificar si es File
            if(extMd(direc)) // si la extensión es .md
                return 'El archivo tiene extensión md' //imprimir que es md
            else //es cualquier otro tipo de archivo
                return 'El archivo no tiene extensión md' //imprimir que no es md
        }
        else
        return readDir(direc); // leer carpeta, imprimir archivos
        }
    else //si la ruta no es válida
        return 'La ruta ingresada no existe. Por favor ingresa una ruta válida.'
};*/

//consiguiendo array de archivos de una carpeta
function getFiles(direc, arrFiles=[]){
    if(isDirectory(direc)){ //si es folder
        readDir(direc).forEach((file) => { 
            const folder = direc+'/'+file;
            getFiles(folder, arrFiles); //recursividad, vuelvo a llamar a la función para que lea cada folder hasta un archivo
          });
    }
    else { //si es un file se agrega al array
        arrFiles.push(turningPathAbs(direc)); //se agrega directamente la ruta al array
        return arrFiles
    };
    return arrFiles //devuelve el array con los archivos
};

//filtrando array con sólo archivos md
function getmdFiles(arrFiles=[]){
    let arrmdFiles = arrFiles.filter((file=>extMd(file))); //filtra los archivos md del array con todos los archivos
    return arrmdFiles //devuelve array con archivos md
};

//función para generar array con links
function getLinks(filePath){
    const regex = /\[(.+)\]\((https?:\/\/\w+.+)\)/g; //expresión regular para identificar páginas web (preguntar si está ok)
    const links = (readingFile(filePath).match(regex)); //match devuelve las coincidencias con la expresión regular (regex)
    if(links!=null){ // sólo agregaremos los archivos que tengan links
        return links //crea un array con los links del archivo después de leerlo
    }
    return []
};

//crear arreglo href text file
function getOb(direc, arrObjetc=[]){
    const arrLinks = getLinks(direc); //obtengo el array de links
    for (let i = 0; i < arrLinks.length; i++){ //recorrer cada elemento para extraer href, text y file
        arrObjetc.push({
            href: arrLinks[i].slice(arrLinks[i].indexOf('](')+2, -1),
            text: arrLinks[i].slice(1, arrLinks[i].indexOf('](')),
            file: turningPathAbs(direc)
        });
    };
    return arrObjetc; //devuelve el arreglo
};

// recursividad para obtener links de varios archivos
function getmdLinks(direc, arrmdLinks=[]){
    let arrmdFiles = getmdFiles(getFiles(direc)) // se obtiene el arreglo de archivos del folder y se filtran los .md
    for(let i = 0; i < arrmdFiles.length; i++){  // recorre cada uno de los archivos md del array
        arrmdLinks.push(...getOb(arrmdFiles[i])); // suma a un nuevo arreglo hrf, text, file
    }
    return arrmdLinks;
};

//console.log(getmdLinks(direc))

//creando función para validar links
function validLinks(arrmdLinks){ //debe recibir un array, llamar a la función con getmdLinks
    return new Promise((resolve) => {
        const arrPromise = [];
        arrmdLinks.forEach((object) => {
            arrPromise.push(fetch(object.href)) // fetch trabaja con objetos, llamamos href (URL)
        });
        Promise.allSettled(arrPromise).then((result)=>{ //fetch devuelve una promesa por eso está asociado a un then
            for (let i = 0; i < result.length; i++){ 
                let okValue
                if(result[i].status === 'fulfilled'){ //si encuentra el status
                    result[i].value.ok ? okValue ='ok' : okValue ='fail'
                    arrmdLinks[i].status = result[i].value.status // agregamos el valor del status
                    arrmdLinks[i].ok = okValue // agregamos ok o fail según corresponda
                }
                else{ //en el caso de no encontrar status
                    okValue = 'fail' //declaramos el valor de ok como fail
                    arrmdLinks[i].status = 'ERROR' // podría ser redirección, connect timeout, entre otros
                    arrmdLinks[i].ok = okValue
                }
            }
            resolve(arrmdLinks)
        })
    });
};

validLinks(getmdLinks(direc)).then(console.log).catch(console.error);

 module.exports = {
    validPath,
    turningPathAbs,
    //readingPath,
    getLinks
  };