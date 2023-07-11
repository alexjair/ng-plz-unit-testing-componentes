import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Person } from './../../models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor() { }

  @Input() person: Person = new Person('', '', 0, 0, 0);

  @Output() onSelected = new EventEmitter<Person>();

  imc = '';

  ngOnInit(): void {
  }

  calcIMC(){
    this.imc = this.person.calcIMC();
  }

  doSomething(){
    this.imc = "77.77";
  }


  onCick() {
    this.onSelected.emit(this.person);
  }


}
