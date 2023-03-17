const { mdLinks } = require('../index.js');

const { turningPathAbs, validPath  } = require('../api.js');


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
    expect(validPath('./txt-prueba.md')).toEqual(true);
  });

});


describe('turningPathAbs', () => {

  it('Debería ser una función', () => {
    expect(typeof turningPathAbs).toBe('function');
  });
});
