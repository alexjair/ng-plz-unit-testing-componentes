import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of  } from 'rxjs';

import { generateManyProducts } from './../../models/product.mock';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './../product/product.component';
import { ProductsService } from './../../services/product.service';
import { ValueService } from './../../services/value.service';

describe('ProductsComponent', () => {

  //PRUEBA CON UN COMPONENTE QUE TIENE UNA DEPENDECIA
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    //Espia de que servicio y de que funcion "GetAll"
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    //inicia data opcional
    const productsMock = generateManyProducts(3); //viene de generador de mock
    productService.getAll.and.returnValue(of(productsMock)); //ver si es un observable o no | of()

    fixture.detectChanges(); //ngOnInit()
  });

  it('should create', () => {
    /*
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));

    fixture.detectChanges();
    */

    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled(); // duespues que se creo el componenete, el getall fue llamado
  });

  fdescribe('tests for getAllProducts', () => {

    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock));

      const countPrev = component.products.length; //poque se contatena, por eso se agrega al total
      // Act
      // CHALLENGE: Don't call method directly, call to call across the clicks events
      component.getAllProducts();
      fixture.detectChanges();
      // Assert
      expect(component.products.length).toEqual(productsMock.length + countPrev);
    });

    it('should change the status  "loading" => "success"', fakeAsync( //faceAsyinc: encierre ()=>{}, y el tick()
      () => {
        //Arrange
          const productsMock = generateManyProducts(10);
          //Forma de asincronismo
          //Aqui se necesita una especie de demora para ver el cambio de "loading" to "success" : typde defer, eso hace
          productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));

        //Act
          // CHALLENGE: Don't call method directly, call to call across the clicks events
          component.getAllProducts();
          fixture.detectChanges();

          expect(component.status).toEqual('loading');

          //el tick, es lo va a resolver en un tiempo despues, e lo que esta pendiente a resolverlo
          tick(); // exec, obs, setTimeout, promise
          fixture.detectChanges();

        //Assert
          expect(component.status).toEqual('success');
      }
    ));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      // Arrange
      //Evaluar un error para la promesa "reject('error')"
      // ya no se usa el mock
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      // Act
      // CHALLENGE: Don't call method directly, call to call across the clicks events
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick(4000); // exec, obs, setTimeout, promise
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('error');
    }));

  });

  fdescribe('tests for callPromise (async -> await)', () => {

    it('should call to "promise"', async () => {
      //Arrange
        const mockMsg = 'my mock string';
        valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      //Act
        await component.callPromise();
        fixture.detectChanges();
      //Assert
        //Evalua la respuesta "rta" con el mock del servicio "valueService"
        expect(component.rta).toEqual(mockMsg);
        //verificar las promesas
        expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    /******************[ prueba con clic!!!! ]********************/

    it('should show "my mock string" in <p> when btn was (clicked)', fakeAsync(() => {
      // Arrange
        const mockMsg = 'my mock string';
        valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
        const btnDe = fixture.debugElement.query(By.css('.btn-promise'));
      // Act
        btnDe.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();
        const rtaDe = fixture.debugElement.query(By.css('p.rta'));
      // Assert
        expect(component.rta).toEqual(mockMsg);
        expect(valueService.getPromiseValue).toHaveBeenCalled();
        expect(rtaDe.nativeElement.textContent).toEqual(mockMsg);
    }));

    it('should change the status "loading" to "error" when btn-products was (clicked)', fakeAsync(() => {
      // Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      const btnDe = fixture.debugElement.query(By.css('.btn-products'));

      // Act
      btnDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000); // exec, obs, setTimeout, promise
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('error');
      expect(productService.getAll).toHaveBeenCalled();
    }));


  });

});
