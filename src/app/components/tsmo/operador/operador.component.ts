import { LegendaType } from './../../../enums/legendas.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {

  menuOperador: string = LegendaType.MenuOperador;

  constructor() { }

  ngOnInit(): void {
    // console.log('Entra a operador component');
  }

}
