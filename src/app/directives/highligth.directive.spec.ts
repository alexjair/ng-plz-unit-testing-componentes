import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HighligthDirective } from './highligth.directive';

//Creando un componenete, para hacer los test.
@Component({
  template: `
    <h5 class="title" highligth>default</h5>
    <h5 highligth="yellow">yellow</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [highligth]="color">
  `
})
class HostComponent {
  color = 'pink';
}

fdescribe('highligth.directive.spec.ts', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ],
      imports: [ FormsModule ] //para el ngModel
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "component"', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highligth elements', () => {
    //Saber cuantos elementos tiene una directva.
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    //elementos que no tiene una directva
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highligth])'));

    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements be <match> with <bgColor>', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('pink');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the <h5>.title be defaultColor', () => {
    //obenter al elemento .title
    const titleDe = fixture.debugElement.query(By.css('.title'));
    //obetener la directiva que se esta llamanado ese elemento, obtener la instancia HighligthDirective
    const dir = titleDe.injector.get(HighligthDirective);
    //se compara el elemento con la instancia de ese elemento.
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  });

  //Test: que el usuario tiene que escribir en el y la directiva debe de cambiarlo.
  it('should bind <input> and change the bgColor', () => {

    //selecciona el 1er input que encuentre, ya solo hay uno
    const inputDe = fixture.debugElement.query(By.css('input'));
    //lo tipamos para mejor experiencia developer
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    //Deberia detener este color por defecto.
    expect(inputEl.style.backgroundColor).toEqual('pink');// default es pink

    //Hacer prueba
    //simular que el usuario cambio a "red", en el input.value
    inputEl.value = 'red';
    //hacer que dom, aga efecto el cambio, asi angular vea el cambio, apara eso "dispatchEvent"
    inputEl.dispatchEvent(new Event('input')); //cambio de tipo "input"

    //detectar cambios
    fixture.detectChanges();

    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });

});
