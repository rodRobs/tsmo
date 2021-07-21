import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increments',
  templateUrl: './increments.component.html',
  styleUrls: ['./increments.component.css']
})
export class IncrementsComponent{

  @Input() progreso: number = 10;
  @Input() colorBtn: string = 'btn btn-primary';

  @Output() modificarProgreso: EventEmitter<number> = new EventEmitter();

  // get getPorcentaje() { return `${this.progreso}%` }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100;
      this.modificarProgreso.emit(this.progreso);
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      this.modificarProgreso.emit(this.progreso);
      return;
    }
    this.progreso = this.progreso + valor;
    this.modificarProgreso.emit(this.progreso);
  }

  onChange(nuevoValor: number) {

    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.modificarProgreso.emit(this.progreso);
  }

}
