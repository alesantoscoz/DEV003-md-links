const { mdLinks } = require('../index.js');

const { turningPathAbs, validPath, readingPath, getLinks } = require('../api.js');


describe('mdLinks', () => {
  it('Debería rechazar path inválido', () =>{
    return mdLinks('./estePathNoExiste.md').catch((error)=>{
      expect(error).toBe('La ruta ingresada no existe');
    })
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

describe('readingPath', () => {
  it('Debería reconocer archivos .md', () => {
    expect(readingPath('./txt-texto.txt')).toBe('El archivo no tiene extensión md');
  });
});

describe('getLinks', () => {
  it('Debería devolver un objeto', () => {
    expect(typeof getLinks('./')).toBe('object');
  });
});


