const { mdLinks } = require('../index.js');

const { turningPathAbs, 
        validPath, 
        getFiles,
        totalLinks,
        brokenLinks } = require('../api.js');


describe('mdLinks', () => {
  it('Debería rechazar path inválido', async () =>{
    try {
      return await mdLinks('./estePathNoExiste.md');
    } catch (error) {
      expect(error).toBe('La ruta ingresada no existe');
    }
  });
});

describe('validPath', () => {
  it('Debería ser una función', () => {
    expect(typeof validPath).toBe('function');
  });
  it('El valor de verdad', () => {
    expect(validPath('./')).toEqual(true);
  });

});

describe('turningPathAbs', () => {
  it('Debería rechazar path invañido', () => {
    expect(turningPathAbs('./estePathNoExiste.md')).toBe('La ruta ingresada no existe. Por favor ingresa una ruta válida.');
  });
});


describe('getFiles', () => {
  it('Debería devolver un objeto', () => {
    expect(typeof getFiles('./')).toBe('object');
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