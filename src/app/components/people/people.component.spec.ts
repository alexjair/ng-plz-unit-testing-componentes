import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from './../../models/person.model';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    // Arrange
    component.people = [
      new Person('Nicolas', 'Molina', 23, 1, 1),
      new Person('Valentina', 'Molina', 12, 2, 3),
      new Person('Santiago', 'Molina', 12, 2, 3),
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    //Evalua cantidad de elementos  = a la cantidad.
    expect(debugElement.length).toEqual(component.people.length);
    //expect(debugElement.length).toEqual(3);
  });

  it('RETO: should "render a person selected" from app-person (por Alumno)', () => {
    //Arrange
    component.people = [
      new Person('Esteban', 'Qs', 27, 89, 1.77),
      new Person('Valentin', 'Feregrino', 12, 2, 3),
      new Person('Antoio', 'Feregrino', 12, 2, 3),
    ];
    const spy = spyOn(component, 'choose').and.callThrough();

    //Act
    fixture.detectChanges();
    const peopleDebug = fixture.debugElement.queryAll(By.css('app-person'));
    peopleDebug[1].query(By.css('button.btn-choose')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const renderPersonList = fixture.debugElement.queryAll(By.css('li'));

    //Assert
    expect(spy).toHaveBeenCalled();
    expect(renderPersonList[0].nativeElement.textContent).toContain(component.people[1].name);
    expect(renderPersonList[1].nativeElement.textContent).toContain(component.people[1].age);
  });


  it('RETO 2:should raise selected event when clicked (alumno 2)', () => {
    // Arrange
    component.people = [
      new Person('Leonardo', 'Arias', 23, 1, 1),
      new Person('Valentina', 'Rodriguez', 12, 2, 3),
      new Person('Santiago', 'Dolores', 12, 2, 3),
    ];
    const idx = 1;
    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    const btnDe = debugElement[idx].query(By.css('.btn-choose'));
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //
    expect(component.selectedPerson).toEqual(component.people[idx]);
  });

  //RETO --------- NICO

  it('RETO **: should raise seleted event when clicked', () => {
    // Arrange
    //query: trae al primero
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges(); //Despues de los cambios mandar a renderizar, buena practica
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('RETO **: should render the "selectedPerson"', () => {
    // Arrange
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDe = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDe.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });


  /*************************************/


});
