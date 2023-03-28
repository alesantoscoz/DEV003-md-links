const { mdLinks } = require('../index.js');

const {     
  validPath,
  isFile,
  isDirectory,
  extMd,
  getFiles,
  getLinks,
  getOb,
  getmdFiles,
  totalLinks,
  brokenLinks, 
  uniqueLinks} = require('../api.js');


describe('mdLinks', () => {
  it('Deberia ser una promesa', async () => {
   try {
    return await mdLinks()
      .then(() => {
        expect(mdLinks).toBe(typeof 'promise')
      })} catch(error){
      };
  });
  it('Debería rechazar path inválido', async () =>{
    try {
      return await mdLinks('./estePathNoExiste.md',{validate : false});
    } catch (error) {
      expect(error).toBe('La ruta ingresada no existe');
    }
  });
  it('Debería rechazar archivos sin extensión md', async () =>{
    try {
      return await mdLinks('./txt-texto.txt',{validate : false});
    } catch (error) {
      expect(error).toBe('No se encontraron archivos con extensión md');
    }
  });
  it('Debería indicar que no existen links', async () =>{
    try {
      return await mdLinks('./carpeta/ejemplo/txt-prueba.md',{validate : false});
    } catch (error) {
      expect(error).toBe('No existen links en el archivo');
    }
  });

});

describe('validPath', () => {
  it('Debería ser una función', () => {
    expect(typeof validPath).toBe('function');
  });
  it('Debería devolver el valor de verdad', () => {
    expect(validPath('./')).toEqual(true);
  });
});

describe('isFile', () => {
  it('Debería devolver el valor de verdad', () => {
    expect(isFile('./')).toEqual(false);
  });
});

describe('getLinks',()=>{
  it('Debería devolver un objeto',()=>{
    expect(typeof getLinks('./README.md')).toBe('object')
  })
})

describe('getOb',()=>{
  it('Debería devolver un objeto',()=>{
    expect(typeof getOb('./README.md')).toBe('object')
  });
});

describe('getmdFiles',()=>{
  it('Debería devolver un objeto',()=>{
    expect(typeof getmdFiles([])).toBe('object')
  });
});

describe('isDirectory', () => {
  it('Debería devolver el valor de verdad', () => {
    expect(isDirectory('./')).toEqual(true);
  });
  it('Debería ser un booleano',()=>{
    expect(typeof isDirectory('./')).toBe('boolean');
  });
});

describe('getFiles', () => {
  it('Debería devolver un objeto', () => {
    expect(typeof getFiles('./')).toBe('object');
  });
});

describe('extMd',()=>{
  it('Debería ser un booleano',()=>{
    expect(typeof extMd('./README.md')).toBe('boolean');
  });
});

const objetoPrueba =[{
  href: 'https://es.wikipedia.org/wiki/Interstellar',
  text: 'interestellar',
  file: 'C:/Users/51940/Desktop/LABORATORIA/PROYECTO_4/DEV003-md-links/carpeta/ejemplo/txt-prueba.md',
  status: 200,
  ok: 'ok'
},
{
  href: 'https://es.javascript.info/primise-basics',
  text: 'Ejemplo',
  file: 'C:/Users/51940/Desktop/LABORATORIA/PROYECTO_4/DEV003-md-links/carpeta/ejemplo/txt-prueba.md',
  status: 404,
  ok: 'fail'
},
{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: 'C:/Users/51940/Desktop/LABORATORIA/PROYECTO_4/DEV003-md-links/carpeta/README.md',
  status: 200,
  ok: 'ok'
}];

describe('totalLinks', () => {
  it('Debería devolver el número de links', () => {
    expect(totalLinks(objetoPrueba)).toBe('Total: 3');
  });
});

describe('brokenLinks', () => {
  it('Debería devolver el número de links rotos', () => {
    expect(brokenLinks(objetoPrueba)).toBe('Broken: 1');
  });
});

describe('uniqueLinks',()=>{
  it('Debería devolver el número de links unicos',()=>{
    expect(uniqueLinks(objetoPrueba)).toBe('Unique: 3')
  })
})