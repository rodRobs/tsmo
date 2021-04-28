import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent {

  @Input() instrucciones: string = '';

}
