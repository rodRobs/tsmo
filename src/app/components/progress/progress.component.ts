import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 15;
  progreso2: number = 50;

  get getProgresoUno() { return `${ this.progreso1 }%`};
  get getProgresoDos() { return `${ this.progreso2 }%`};

  // modificarProgresoHijoUno(progreso: number) {
  //   this.progreso1 = progreso;
  // }

  // modificarProgresoHijoDos(progreso: number) {
  //   this.progreso2 = progreso;
  // }

}
