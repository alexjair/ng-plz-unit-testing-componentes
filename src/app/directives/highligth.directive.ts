import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highligth]'
})
export class HighligthDirective implements OnChanges {

  defaultColor = 'pink';
  @Input('highligth') bgColor = '';

  constructor(
    private element: ElementRef
  ) {
    //modificacion desde javascript
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(): void {
    //modificacion desde javascript
    //Si existe un "bgColor" lo aplica, sino aplica un "defaultColor";
    this.element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }

}
