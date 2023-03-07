/*module.exports = () => {
  // ...
};*/


const fs = require('fs'); //file system
const path = require('path'); //dirección (ruta)
const direc = './txt-prueba.md' // archivo de prueba

const validPath = (direc) => fs.existsSync(direc); //validar que la dirección existe (devuelve booleano)
console.log(validPath(direc)); //imprimir valor de verdad

const pathAbs = (direc) => path.isAbsolute(direc);//validar si es absoluta o relativa (devuelve booleano)
console.log(pathAbs(direc)); //imprimir valor de verdad

 /*Creando función para transformar ruta relativa*/
function turnPathAbs(){
  if(validPath(direc)===true){
    if (pathAbs(direc)===false){
   return path.join(__dirname,direc);
    }
    else{
    return direc
    }
  }
  else
  return 'Inserte una ruta válida'
}
console.log(turnPathAbs()); //imprimir ruta



