import { LegendaType } from 'src/app/enums/legendas.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-operador',
  templateUrl: './menu-operador.component.html',
  styleUrls: ['./menu-operador.component.css']
})
export class MenuOperadorComponent implements OnInit {

  menuOperador: string = LegendaType.MenuOperador;

  constructor() { }

  ngOnInit(): void {
  }

}
