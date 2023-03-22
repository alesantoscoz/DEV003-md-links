const api = require('./api')

const path = './carpeta/ejemplo/txt-prueba.md' // archivo de prueba

function mdLinks(path, options){
  return new Promise((resolve, reject) => {
    if (api.validPath(path)){
      const absolutePath = api.turningPathAbs(path)
      if(api.isFile(absolutePath)){
        if(api.extMd(absolutePath)){
          const validLinks = api.validLinks(api.getmdLinks(path));
          resolve(validLinks);
        }
            else 
                reject ('El archivo no tiene extensión md');
      }   
      if(api.isDirectory){
        api.getFiles(absolutePath)
        const mdFiles = api.getmdFiles(api.getFiles(absolutePath))
        if(mdFiles.length !== 0){
         const validLinks = api.validLinks(api.getmdLinks(path));
         resolve(validLinks)
        }
        else if (mdFiles.length == 0){
        reject('No se encuentran archivos con extensión md')
        }
      }
    }
    else if(!api.validPath(path)){
      reject ('La ruta ingresada no existe');
    }
  });
}

//.then( (resultado)=> { ... } )
//console.log(mdLinks(path));
mdLinks(path).then(console.log).catch(console.error);

module.exports = {
  mdLinks
};