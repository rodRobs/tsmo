import { TokenService } from './../../services/usuarios/token.service';
import { EnvioGranelDtoModel } from './../../models/dto/envioGranel.model';
import { EnvioService } from './../../services/envio/envio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstruccionesType } from './../../enums/instrucciones.enum';
import { ArchivoService } from './../../services/archivo/archivo/archivo.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MasivoResponseDtoModel } from 'src/app/models/dto/masivosResponseDto.model';

@Component({
  selector: 'app-subir-excel-envios',
  templateUrl: './subir-excel-envios.component.html',
  styleUrls: ['./subir-excel-envios.component.css']
})
export class SubirExcelEnviosComponent implements OnInit {

  // forma: FormGroup;

  public instrucciones: string = InstruccionesType.Archivo;

  public pedidoFile: any = File;
  public masivosResponse: MasivoResponseDtoModel;

  public bandera: boolean = false;

  // Banderas para mostrar listas
  public mostrarExito: boolean = false;
  public mostrarNoCobertura: boolean = false;
  public mostrarError: boolean = false;

  // Costo
  public costoCotizaciones: number;

  // Mensajes
  public mensajeFalta: string = 'Selecciona tu archivo excel para los envíos';
  public mensajeBool: boolean = false;

  // Loading
  public loading: boolean = false;

  // Formulario para nombre
  public form: FormGroup;

  constructor(
    private archivoService: ArchivoService,
    private envioService: EnvioService,
    private fb: FormBuilder,
    private tokenService: TokenService
    // private fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    console.log(this.pedidoFile);
    console.log(localStorage.getItem(''))
    // this.crearFormulario();
  }

  onGuardar() {
    if (this.pedidoFile == File) {
      this.mensajeBool = true;
      return;
    }
    this.loading = true;
    this.mensajeBool = false;
    this.bandera = false;
    const formData = new FormData();
    formData.append('pedidos', this.pedidoFile);

    this.archivoService.guardarArchivo(formData)
    .subscribe(response => {
      // console.log(response);
      this.bandera = true;
      this.masivosResponse = response;
      this.calcularCosto();
      this.loading = false;
    }, error => {
      this.loading = false;
      alert('Se presento un error, favor de intentarlo mas tarde');
    })
  }

  onArhivoSeleccionado(event) {
    // console.log(event);
    let id;
    var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if (es_chrome) {
      id = event.currentTarget.id;
    } else {
      id = event.explicitOriginalTarget.id;
    }
    const file = event.target.files[0];
    this.pedidoFile = file;
    console.log(file);
  }

  onMostrarExito() {
    this.mostrarExito = !this.mostrarExito;
  }

  onMostrarSinCobertura() {
    this.mostrarNoCobertura = !this.mostrarNoCobertura;
  }

  onMostrarError() {
    this.mostrarError = !this.mostrarError;
  }

  calcularCosto() {
    this.costoCotizaciones = 0;
    this.masivosResponse.exito.forEach(envio =>{
      this.costoCotizaciones += envio.documentacion['cotizacion'].costo.costoTotal;
    })
  }

  // get fileExcelInvalido() { return this.forma.get('excel').value == File};

  // crearFormulario() {
  //   this.forma = this.fb.group({
  //     excel: [File, Validators.required]
  //   })
  // }

  onContratar() {
    if (this.form.invalid) {
      this.form.get('nombre').markAllAsTouched();
      return;
    }
    this.envioService.guardarGranel(this.asignarValoresEnviosGranel(), this.tokenService.getUserName())
    .subscribe(response => {
      console.log(response);
    })
  }

  asignarValoresEnviosGranel(): EnvioGranelDtoModel {
    return new EnvioGranelDtoModel(
      null, null, this.form.get('nombre').value, this.masivosResponse.exito.length, 0, null, null, this.masivosResponse.exito
    );
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  get nombreNoValid() { return this.form.get('nombre').invalid && this.form.get('nombre').touched; }

}
