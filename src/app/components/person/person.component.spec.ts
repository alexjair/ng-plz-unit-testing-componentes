import { ComponentFixture, TestBed } from '@angular/core/testing';

//Seccion de los artefactos, para el componente
import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;

  //fixture, es un ambiente para poder interactuar con ese componenete, (render, obtiene la instacia)
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    //inicial un module pequeño necesario, en donde empezamos a hacer las pruebas

    //es asincrono, difernente de serv. a donde vamos a hacer pruebas.
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  //doble de beforeeach,
  beforeEach(() => {
    //debemos que crear el fixture, creamos los componenetes que necesitamos.
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Jair','Rojas',25,75,1.5);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "July"',()=>{
    component.person = new Person('July','Rojas',25,75,1.5);
    expect(component.person.name).toEqual('July');
  });

  it('should have <p> width "Soy un parrafo"', () => {
    //obetener el elemento.
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');
    expect(p?.textContent).toEqual('Soy un parrafo');
  });

  //Esperando que render sera en el Cliente
  it('should have <h3> width "Hola, PersonComponent" (Render Cliente)', () => {
    //obetener el elemento.
    const personElement: HTMLElement = fixture.nativeElement;
    const h = personElement.querySelector('h3');
    expect(h?.textContent).toEqual('Hola, PersonComponent');
  });

  //DEBUG ELEMENT

  //Ser Agnostico a la Plataforma - Buena Practica.
  it('should have <p> width "Soy un parrafo" (Server render | Agnostic | Good )', () => {
    //obetener el elemento Debug.
    const personDebug: DebugElement = fixture.debugElement;
    const personElement: HTMLElement = personDebug.nativeElement;
    const h = personElement.querySelector('p');
    expect(h?.textContent).toEqual('Soy un parrafo');
  });

  //Ejecutar Selectores CSS
  it('should have <p> width "Soy un parrafo" ( Server render | CSS query By )', () => {
    //obetener el elemento Debug.
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //const p = pElement.querySelector('p')
    expect(pElement?.textContent).toEqual('Soy un parrafo');
  });

  //Ejecutar Selectores CSS
  it('should have <h3> width "Hola, PersonComponent" (Render Server | CSS query By )', () => {
    //obetener el elemento Debug.
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('h3'));
    const pElement: HTMLElement = pDebug.nativeElement;
    expect(pElement?.textContent).toEqual('Hola, PersonComponent');
  });

   //IMPUTS!!!
   //---------

   //valentina
   it('should have <h2> width "Hola, {person.name}" (Render Server | CSS query By )', () => {
    //Arrange
    component.person = new Person('Valentina','Rejas',20,45,1.4); // update clase
    const mesageToExpect = `hola, ${component.person.name}`; // to except

    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('h2'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    //Hacer que angular detecte cambios, porque no lo hace en pruebas.
    fixture.detectChanges();

    //Assert
    expect(pElement?.textContent).toEqual(mesageToExpect);
  });

  it('should have <h2> width "Mi altura es {person.height}" (Render Server | CSS query By )', () => {
    //Arrange
    component.person = new Person('Laura','Rejas',21,46,1.7); // update clase
    const mesageToExpect = `Mi altura es ${component.person.height}`; // to except

    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('label'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    //Hacer que angular detecte cambios, porque no lo hace en pruebas.
    fixture.detectChanges();

    //Assert
    //Extactemete igual
    //expect(pElement?.textContent).toEqual(mesageToExpect);
    //Oh que te contenga eso..
    expect(pElement?.textContent).toContain(mesageToExpect);
  });

  //CLICK

  //LLamada por el metodo
  it('should display a text with IMC when "call metodo calcIMC()"', () => {
    // Arrange
    const expectMsg = 'overweight level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    // Act
    component.calcIMC();
    fixture.detectChanges();
    // Assert
    expect(button.textContent).toContain(expectMsg);
  });

  //"Para obtener el elemento con clic"
  it('should display a text with IMC when do "click & event: null"', () => {
    // Arrange
    const expectMsg = 'overweight level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;
    // Act
    buttonDe.triggerEventHandler('click', null); //llamada al eveto clic, null (sin eventos) xq no evia ningun detalle
    fixture.detectChanges();
    // Assert
    expect(buttonEl.textContent).toContain(expectMsg); // es parecido a %LIKE%
  });

  it('should de estar estar ejecutando la acción "doSomething()"', () => {
      const debugElement: DebugElement = fixture.debugElement.query(By.css('button.btn-dosomething'));
      debugElement.triggerEventHandler('click', null);

      const spy = spyOn(fixture.componentInstance, 'doSomething');
      debugElement.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalled();
  });


  //Componentes con Output
  //------------------------
  //
  it('should raise "Selected" event when do "click"', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Perez', 30, 120, 1.65);

    component.person = expectedPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected
      .subscribe(
        person => {
          selectedPerson = person
        }
      );

    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  })


});

//Aislando componentes

/*
Pruebas aisladas al componente
++++++++++++++++++++++++++++++

💡 Las pruebas aisladas entre componentes son pruebas que se realizan sobre un componente sin tener en cuenta sus dependencias o
componentes hijos.

Normalmente, los componentes que poseen varios (@Inputs) u (@Outputs) se usan cómo hijos de otros componentes más grandes.
En estos casos, es necesario ejecutar pruebas aisladas para verificar el comportamiento y la lógica del componente en sí,
sin tener en cuenta cómo interactúa con otros componentes o servicios.
*/

//PROBAR component Padres Templade
@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})
class HostComponent {
  person = new Person('Jair', 'Molina', 12, 40, 1.5);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}


describe('PersonComponent from HostComponent (AISLADO)', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectName = component.person.name;
    const h2De = fixture.debugElement.query(By.css('app-person h2'));
    const h2El = h2De.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h2El.textContent).toContain(expectName);
  });


  it('should raise selected event when clicked', () => {
    // Arrange
    const btnDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    //expect(component.selectedPerson).toContain(component.person); //error por qes solo para texto
    expect(component.selectedPerson).toEqual(component.person); //obj
  })
});
