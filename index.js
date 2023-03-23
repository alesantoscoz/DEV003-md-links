const api = require('./api')

const path = './carpeta' // archivo de prueba

function mdLinks(path, options){
  return new Promise((resolve, reject) => {
    if (!api.validPath(path)){
      reject ('La ruta ingresada no existe');
      return;
    }
    const mdFilesArray = api.getmdFiles(api.getFiles(path))
    if(mdFilesArray.length == '0'){
      reject('No se encontraron archivos con extensión md');
      return;
    }
    const validLinks = api.validLinks(api.getmdLinks(path));
    validLinks.then((arrayObjetos) => {
      if(arrayObjetos.length){
        resolve(arrayObjetos)
        return;
      }
      reject('No existen links en el archivo')
    }) 
  });
}

mdLinks(path).then(console.log).catch(console.error);

module.exports = {
  mdLinks
};