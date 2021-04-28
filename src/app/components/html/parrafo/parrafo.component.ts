import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-parrafo',
  templateUrl: './parrafo.component.html',
  styleUrls: ['./parrafo.component.css']
})
export class ParrafoComponent {

  @Input() parrafo: string;

}
