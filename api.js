const fs = require('fs'); //file system
const path = require('path'); //dirección (ruta)
const direc = './txt-text.txt' // archivo de prueba

const validPath = (direc) => fs.existsSync(direc); //validar que la dirección existe
console.log('La ruta es válida: ', validPath(direc)); //imprimir valor de verdad

const pathAbs = (direc) => path.isAbsolute(direc);//validar si es absoluta o relativa
console.log('La ruta es absoluta: ', pathAbs(direc)); //imprimir valor de verdad

const isDirectory = (direc) => fs.statSync(direc).isDirectory(); //validar si es directorio
//console.log('La ruta es un directorio: ', isDirectory(direc)); //imprimir valor de verdad

const isFile = (direc) => fs.statSync(direc).isFile(); //valida si es archivo
//console.log('La ruta es un archivo: ', isFile(direc)); //imprimir valor de verdad

const extMd = (direc) => path.extname(direc) === '.md'; //validar extensión de archivo
console.log('Es un archivo .md: ', extMd(direc)); //imprimir valor de verdad


/*Creando función para transformar ruta relativa*/
function turnPathAbs() {
  if (validPath(direc)) { //si la ruta es válida
    if (!pathAbs(direc)) { //si la ruta no es absoluta
      return path.join(__dirname, direc); //convierte la ruta en absoluta
    }
    else { //si la ruta no es válida
      return direc
    }
  }
  else
    return 'La ruta ingresada no existe. Por favor ingresa una ruta válida.'
};

console.log('La ruta absoluta es: ', turnPathAbs()); //imprimir ruta
