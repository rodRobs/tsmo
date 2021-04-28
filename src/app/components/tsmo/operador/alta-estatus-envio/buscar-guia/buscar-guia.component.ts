import { EnvioDto } from './../../../../../models/dto/EnvioDto.model';
import { EnvioService } from './../../../../../services/envio/envio.service';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';


@Component({
  selector: 'app-buscar-guia',
  templateUrl: './buscar-guia.component.html',
  styleUrls: ['./buscar-guia.component.css']
})
export class BuscarGuiaComponent implements OnInit {

  // Formulario
  forma: FormGroup;

  // Legenda
  legendaGuia: string = LegendaType.BuscarGuia;

  // Envio
  envio: EnvioMostrar;

  // Error
  error: string;
  errorBoolean: boolean = false;

  // Output
  @Output () buscarEnvio = new EventEmitter<EnvioMostrar>();


  constructor(
    private fb: FormBuilder,
    private envioService: EnvioService
  ) {
    this.onCrearFormulario();
  }

  ngOnInit(): void {
  }

  onCrearFormulario() {
    this.forma = this.fb.group({
      guia: ['', Validators.required]
    })
  }

  get guiaNoValido() {return this.forma.get('guia').invalid && this.forma.get('guia').touched; }

  markTouched() {
    this.forma.get('guia').markAllAsTouched();
  }

  onSubmit() {
    if (this.forma.invalid) { this.markTouched(); return; }
    this.envioService.buscarEnvioPorGuia(this.forma.get('guia').value)
    .subscribe(envio => {
      // console.log(envio);
      this.envio = envio;
      this.buscarEnvio.emit(this.envio);
      this.errorBoolean = false;
      document.getElementById('footer').style.position = 'relative';
    }, error => {
      this.buscarEnvio.emit(null);
      this.errorBoolean = true;
      this.error = error['error'];
    })
  }

}
