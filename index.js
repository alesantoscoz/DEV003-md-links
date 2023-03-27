const api = require('./api')

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
    if(options.validate){
      const validLinks = api.validLinks(api.getmdLinks(path));
      validLinks.then((arrayObjetos) => {
        if(arrayObjetos.length){
          resolve(arrayObjetos);
          return;
        }
        reject('No existen links en el archivo');
      }); 
    }
    else if(!options.validate){
      const links = api.getmdLinks(path);
      if(links.length){
        resolve(links);
        return;
      };
      reject('No existen links en el archivo');
    }
  });
};

module.exports = {
  mdLinks
};