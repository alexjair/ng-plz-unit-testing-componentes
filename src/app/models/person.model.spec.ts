//primero import la clase para hacer la  pruebas
/*
Arrange: (Arreglar). Se establece el estado inicial, conocida como el sujeto a probar. Aquí se inicializan variables,
importaciones. Se crea el ambiente a probar.
Act (Actuar): Se generan acciones o estímulos. Se llaman métodos, o se simulan clicks por ejemplo
Assert (Afirmar): observar el comportamiento. Los resultados son los esperados. Eje: Que algo cambie,
se incremente, o no suceda nada.
*/

import { Person } from './person.model';

describe('Tests for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Jair', 'Rojas', 39, 71, 1.60);
  });

  it('Deberia tener los atributos esperados', () => {
    expect(person.name).toEqual('Jair');
    expect(person.lastName).toEqual('Rojas');
    expect(person.age).toEqual(39);
  });

  describe('tests for calcIMC', () => {
    it('should return a string: down', () => {
      // Arrange
      person.weight = 40;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('down');
    });

    it('should return a string: normal', () => {
      // Arrange
      person.weight = 58;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('normal');
    });

    it('should return a string: overweight', ()=>{
      person.weight = 80;
      person.height = 1.75;
      expect(person.calcIMC()).toEqual('overweight');
    });

    it('should return a string: overweight level 1', ()=>{
      person.weight = 75;
      person.height = 1.65;
      expect(person.calcIMC()).toEqual('overweight level 1');
    });

    it('should return a string: overweight level 2', ()=>{
      person.weight = 90;
      person.height = 1.65;
      expect(person.calcIMC()).toEqual('overweight level 2');
    });

    it('should return a string: overweight level 3', ()=>{
      person.weight = 120;
      person.height = 1.65;
      expect(person.calcIMC()).toEqual('overweight level 3');
    });

    it('should return a string: not found', ()=>{
      person.weight = -48;
      expect(person.calcIMC()).toEqual('not found');
      person.weight = -48;
      person.weight = -1.70;
      expect(person.calcIMC()).toEqual('not found');
    })
  });
});
