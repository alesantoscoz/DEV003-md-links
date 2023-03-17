const api = require('./api')

const path = './txt-pruba.md' // archivo de prueba

function mdLinks(path){
  return new Promise((resolve, reject) => {
    if (api.validPath(path)){
      resolve('La ruta es valida') 
    }
    else if(!api.validPath(path)){
      reject ('La ruta ingresada no existe');
    }
  });
}

//.then( (resultado)=> { ...} )
//console.log(mdLinks(path));
//mdLinks(path).then(console.log).catch(console.error);

module.exports = {
  mdLinks
};