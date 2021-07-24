import { CancelacionService } from './../../services/cancelacion/cancelacion.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostCancelacionDto } from 'src/app/models/dto/postCancelacion.model';

@Component({
  selector: 'app-cancelacion',
  templateUrl: './cancelacion.component.html',
  styleUrls: ['./cancelacion.component.css']
})
export class CancelacionComponent implements OnInit {

  // Formulario
  forma: FormGroup;

  // Respuestas
  exito: string = 'Se ha cancelado correctamente el envio';
  exitoBool: boolean = false;
  error: string = '';
  errorBool: boolean = false;


  constructor(
    private fb: FormBuilder,
    private cancelacionService: CancelacionService
  ) {
    this.onCrearFormulario();
  }

  ngOnInit(): void {
  }

  onCrearFormulario() {
    this.forma = this.fb.group({
      guia:   ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  get guiaNoValido() {return this.forma.get('guia').invalid && this.forma.get('guia').touched; }
  get descripcionNoValido() { return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched; }

  onCancelar() {
    if (this.forma.invalid) { this.markAllTouched(); return; }
    this.cancelacionService.cancelacionGuia(this.asignarValores())
    .subscribe(cancelacion => {
      this.errorBool = false;
      this.exitoBool = true;
      // console.log(cancelacion);
    }, error => {
      error = error['error'].message;
      this.errorBool = true;
      this.exitoBool = false;
    })
  }

  markAllTouched() {
    Object.values( this.forma.controls ).forEach(control => {
      control.markAllAsTouched();
    })
  }

  asignarValores(): PostCancelacionDto {
    return new PostCancelacionDto(
      this.forma.get('guia').value,
      this.forma.get('descripcion').value
    )
  }

}
