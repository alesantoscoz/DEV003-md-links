const fs = require('fs'); //file system
const path = require('path'); //dirección (ruta)
const direc = './README.md' ;// direccion de prueba

const validPath = (direc) => fs.existsSync(direc); //validar que la dirección existe
const isAbs = (direc) => path.isAbsolute(direc);//validar si es absoluta o relativa
const isDirectory = (direc) => fs.statSync(direc).isDirectory(); //validar si es directorio
const readDir = (direc) => fs.readdirSync(direc); //Recorre la carpeta
const isFile = (direc) => fs.statSync(direc).isFile(); //valida si es archivo
const extMd = (direc) => path.extname(direc) === '.md'; //validar extensión de archivo
const turningAbs = (direc) => path.join(__dirname, direc); //transformando a absoluta

//Creando función para transformar ruta relativa
function turningPathAbs(direc) {
  if(validPath(direc)) { //si la ruta es válida
    if(!isAbs(direc)) { //si la ruta no es absoluta
      return turningAbs(direc); //convierte la ruta en absoluta
    }
    else { //si la ruta es absoluta
      return direc
    }
  }
  else
    return 'La ruta ingresada no existe. Por favor ingresa una ruta válida.'
};

function readingPath(direc) {
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
};

const readingFile = (direc) => fs.readFileSync(direc, 'utf8');
//console.log(readingFile(direc))

/*let arrFiles = [];
//consiguiendo array de archivos de una carpeta
function getFiles(){
    if(isFile(direc)){ //si es file
        return arrFiles.push(direc); //se agrega directamente la ruta al array
    }
    else { //si es directorio se lee el directorio primero
        readDir(direc).forEach((file) => { 
          arrFiles.push(path.join(__dirname,file));
           //arrFiles = [...arrFiles, ...(getFiles(path.join(pathAbs,file)))];
        });
        return arrFiles;
    }
};
getFiles()
console.log(arrFiles);

function getmdFiles(){
    return arrFiles.filter((file=>extMd(file)));
};

console.log(getmdFiles(direc));

let arrFilesOnly =[] ;

const filtFiles = (direc) => {
    readDir(direc).forEach(folder => {
        if (isDirectory(folder)) {
            filtFiles(folder);
        } else if (isFile(direc)) {
            arrFilesOnly.push(path.join(__dirname,direc));
        }
        return arrFilesOnly;
    });
};

filtFiles(direc);
console.log(arrFilesOnly);*/

function getLinks(){ //función para generar array con links
    const regex = /\[(.+)\]\((https?:\/\/\w+.+)\)/g; //expresión regular para identificar páginas web (preguntar si está ok)
    return arrLinks = (readingFile(direc).match(regex)); //crea un array con los links del archivo después de leerlo
    //match devuelve las coincidencias con la expresión regular (regex)
};

getLinks(direc)
console.log(arrLinks)

//crear arreglo href text file
let arrObjetc=[];
function getOb(){
    for (let i = 0; i < arrLinks.length; i++){
        arrObjetc.push({
            href: arrLinks[i],
            text: arrLinks[i], //preguntar
            file: turningAbs(direc)
        });
    };
    return arrObjetc;
};
getOb(direc);
console.log(arrObjetc);


//console.log(mifuncion(x))

 module.exports = {
    validPath,
    turningPathAbs,
    readingPath
  };