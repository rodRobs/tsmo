import { DestinoService } from './../../services/cotizacion/destino.service';
import { CoberturaService } from './../../services/cobertura/cobertura.service';
import { OrigenService } from './../../services/cotizacion/origen.service';
import { CoberturaDto } from './../../models/dto/cobertura.model';
import { CoberturaResponseModel } from './../../models/response/cobertura-response.model';
import { PaqueteDto } from 'src/app/models/dto/paquete.model';
import { DestinoDto } from 'src/app/models/dto/destinoDto.model';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { ParrafoType } from 'src/app/enums/parrafo.enum';

@Component({
  selector: 'app-datos-envio',
  templateUrl: './datos-envio.component.html',
  styleUrls: ['./datos-envio.component.css']
})
export class DatosEnvioComponent implements OnInit {

  lengend: string = LegendaType.Envio;
  legenda: string = LegendaType.TituloEnvio;
  parrafo: string = ParrafoType.EnvioDestino;

  // perfil
  perfil: number;

  // Formulario
  forma: FormGroup;

  // Booleans
  coloniaBoolean: boolean = false;

  // Listas
  coloniasOrigen: string[] = [];
  coloniasDestino: string[] = [];

  // Opciones
  opcionUno: boolean = false; // domicilio = true && ocurre = true
  opcionDos: boolean = false; // domicilio = true && ocurre = false
  opcionTres: boolean = false; // domicilio = false && ocurre = true
  opcionCuatro: boolean = false; // domicilio = false && ocurre = false

  // Para realizar cobertura
  coberturaResponse: CoberturaResponseModel[] = [];
  coberturaDto: CoberturaDto = new CoberturaDto('','');

  constructor(
    private fb: FormBuilder,
    private origenService: OrigenService,
    private destinoService: DestinoService,
    private coberturaService: CoberturaService
  ) { }

  ngOnInit(): void {
  }

  onCrearFormulario() {
    this.forma = this.fb.group({
      remitente: ['', Validators.required],
      emailOrigen: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      cpOrigen: ['', Validators.required],
      coloniaOrigen: ['', Validators.required],
      calleOrigen: ['', Validators.required],
      numeroExtOrigen: ['', Validators.required],
      numeroIntOrigen: [''],
      ciudadOrigen: [{value: '', disabled: false}, Validators.required],
      estadoOrigen: [{value: '', disabled: false}, Validators.required],
      telefonoOrigen: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      referenciaOrigen: ['', Validators.required],
      destinatario: ['', Validators.required],
      destinatario_dos: [''],
      emailDestino: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      cpDestino: ['', Validators.required],
      coloniaDestino: ['', Validators.required],
      calleDestino: ['', Validators.required],
      numeroExtDestino: ['', Validators.required],
      numeroIntDestino: [''],
      ciudadDestino: [{value: '', disabled: false}, Validators.required],
      estadoDestino: [{value: '', disabled: false}, Validators.required],
      telefonoDestino: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      referenciaDestino: ['', Validators.required],
      tipoRecoleccion: ['', Validators.required],
      tipoEntrega: ['', Validators.required],
      tipoEnvio: ['', Validators.required],
      largo: ['', /*Validators.required*/],
      ancho: ['', /*Validators.required*/],
      alto: ['', /*Validators.required*/],
      peso: ['', Validators.required],
      valor: [''],
      contenido: ['', Validators.required]
    })
  }

  get remitenteNoValido() { return this.forma.get('remitente').invalid && this.forma.get('remitente').touched; };
  get emailOrigenNoValido() { return this.forma.get('emailOrigen').invalid && this.forma.get('emailOrigen').touched; };
  get cpOrigenNoValido() { return this.forma.get('cpOrigen').invalid && this.forma.get('cpOrigen').touched; };
  get coloniaOrigenNoValido() { return this.forma.get('coloniaOrigen').invalid && this.forma.get('coloniaOrigen').touched; };
  get calleOrigenNoValido() { return this.forma.get('calleOrigen').invalid && this.forma.get('calleOrigen').touched; };
  get numeroExtOrigenNoValido() { return this.forma.get('numeroExtOrigen').invalid && this.forma.get('numeroExtOrigen').touched; };
  get numeroIntOrigenNoValido() { return this.forma.get('numeroIntOrigen').invalid && this.forma.get('numeroIntOrigen').touched; };
  get ciudadOrigenNoValido() { return this.forma.get('ciudadOrigen').invalid && this.forma.get('ciudadOrigen').touched; };
  get estadoOrigenNoValido() { return this.forma.get('estadoOrigen').invalid && this.forma.get('estadoOrigen').touched; };
  get telefonoOrigenNoValido() { return this.forma.get('telefonoOrigen').invalid && this.forma.get('telefonoOrigen').touched; };
  get referenciaOrigenNoValido() { return this.forma.get('referenciaOrigen').invalid && this.forma.get('referenciaOrigen').touched; };
  get destinatarioNoValido() { return this.forma.get('destinatario').invalid && this.forma.get('destinatario').touched; };
  get destinatario_dosNoValido() { return this.forma.get('destinatario_dos').invalid && this.forma.get('destinatario_dos').touched; };
  get emailDestinoNoValido() { return this.forma.get('emailDestino').invalid && this.forma.get('emailDestino').touched; };
  get cpDestinoNoValido() { return this.forma.get('cpDestino').invalid && this.forma.get('cpDestino').touched; };
  get coloniaDestinoNoValido() { return this.forma.get('coloniaDestino').invalid && this.forma.get('coloniaDestino').touched; };
  get calleDestinoNoValido() { return this.forma.get('calleDestino').invalid && this.forma.get('calleDestino').touched; };
  get numeroExtDestinoNoValido() { return this.forma.get('numeroExtDestino').invalid && this.forma.get('numeroExtDestino').touched; };
  get numeroIntDestinoNoValido() { return this.forma.get('numeroIntDestino').invalid && this.forma.get('numeroIntDestino').touched; };
  get ciudadDestinoNoValido() { return this.forma.get('ciudadDestino').invalid && this.forma.get('ciudadDestino').touched; };
  get estadoDestinoNoValido() { return this.forma.get('estadoDestino').invalid && this.forma.get('estadoDestino').touched; };
  get telefonoDestinoNoValido() { return this.forma.get('telefonoDestino').invalid && this.forma.get('telefonoDestino').touched; };
  get referenciaDestinoNoValido() { return this.forma.get('referenciaDestino').invalid && this.forma.get('referenciaDestino').touched; };
  get tipoRecoleccionNoValido() { return this.forma.get('tipoRecoleccion').invalid && this.forma.get('tipoRecoleccion').touched; };
  get tipoEntregaNoValido() { return this.forma.get('tipoEntrega').invalid && this.forma.get('tipoEntrega').touched; };
  get tipoEnvioNoValido() { return this.forma.get('tipoEnvio').invalid && this.forma.get('tipoEnvio').touched; };
  get largoNoValido() { return this.forma.get('largo').invalid && this.forma.get('largo').touched; };
  get anchoNoValido() { return this.forma.get('ancho').invalid && this.forma.get('ancho').touched; };
  get altoNoValido() { return this.forma.get('alto').invalid && this.forma.get('alto').touched; };
  get pesoNoValido() { return this.forma.get('peso').invalid && this.forma.get('peso').touched; };
  get valorNoValido() { return this.forma.get('valor').invalid && this.forma.get('valor').touched; };
  get contenidoNoValido() { return this.forma.get('contenido').invalid && this.forma.get('contenido').touched; };


  onPagar() {
    if (this.forma.invalid) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  asignarOrigen(origen: OrigenDto) {
    this.forma.get('remitente').setValue(origen.remitente);
    this.forma.get('emailOrigen').setValue(origen.email);
    this.forma.get('cpOrigen').setValue(origen.domicilio.codigoPostal);
    this.forma.get('coloniaOrigen').setValue(origen.domicilio.colonia);
    this.forma.get('calleOrigen').setValue(origen.domicilio.calle);
    this.forma.get('numeroExtOrigen').setValue(origen.domicilio.numeroExt);
    this.forma.get('numeroIntOrigen').setValue(origen.domicilio.numeroInt);
    this.forma.get('ciudadOrigen').setValue(origen.domicilio.ciudad);
    this.forma.get('estadoOrigen').setValue(origen.domicilio.estado);
    this.forma.get('telefonoOrigen').setValue(origen.telefonos[0].numeroTelefono);
    this.forma.get('referenciaOrigen').setValue(origen.referencia);
  }

  asignarDestino(destino: DestinoDto) {
    this.forma.get('destinatario').setValue(destino.destinatario);
    this.forma.get('destinatario_dos').setValue(destino.destinatario2);
    this.forma.get('emailDestino').setValue(destino.email);
    this.forma.get('cpDestino').setValue(destino.domicilio.codigoPostal);
    this.forma.get('coloniaDestino').setValue(destino.domicilio.colonia);
    this.forma.get('calleDestino').setValue(destino.domicilio.calle);
    this.forma.get('numeroExtDestino').setValue(destino.domicilio.numeroExt);
    this.forma.get('numeroIntDestino').setValue(destino.domicilio.numeroInt);
    this.forma.get('ciudadDestino').setValue(destino.domicilio.ciudad);
    this.forma.get('estadoDestino').setValue(destino.domicilio.estado);
    this.forma.get('telefonoDestino').setValue(destino.telefonos[0].numeroTelefono);
    this.forma.get('referenciaDestino').setValue(destino.referencia);
  }

  asignarPaquete(paquete: PaqueteDto) {

  }

  onBuscarCP() {}

  actualizarForm(tipo: string) {
    this.forma.get('tipoEnvio').setValue(tipo);
    if (tipo == 'P') {
      // console.log('Paquete');
      this.validarFormPaquete();
    } else if (tipo == 'L') {
      this.asignarValoresLTL();
    } else {
      // console.log('Otro a paquete');
      this.invalidarFormPaquete();
    }
  }

  validarFormPaquete() {
    this.forma.get('largo').enable();
    this.forma.get('ancho').enable();
    this.forma.get('alto').enable();
  }

  invalidarFormPaquete() {
    this.forma.get('largo').disable();
    this.forma.get('ancho').disable();
    this.forma.get('alto').disable();
  }

  asignarValoresLTL() {
    this.forma.get('peso').setValidators(Validators.required);
    this.forma.get('peso').setValue(500);
    this.forma.get('peso').disable();
    this.forma.get('peso').updateValueAndValidity();
    this.forma.get('largo').setValidators(Validators.required);
    this.forma.get('largo').setValue(120);
    this.forma.get('largo').disable();
    this.forma.get('largo').updateValueAndValidity();
    this.forma.get('ancho').setValidators(Validators.required);
    this.forma.get('ancho').setValue(110);
    this.forma.get('ancho').disable();
    this.forma.get('ancho').updateValueAndValidity();
    this.forma.get('alto').setValidators(Validators.required);
    this.forma.get('alto').setValue(180);
    this.forma.get('alto').disable();
    this.forma.get('alto').updateValueAndValidity();
  }

  asignarValidaciones() {
    if (this.forma.get('tipoEnvio').value == 'P') {
      // console.log('Validaciones paquete');
      this.validacionesPaquete();
    } else if (this.forma.get('tipoEnvio').value == 'L') {
      this.asignarValoresLTL();
    } else {
      // console.log('Validaciones para sobre y valija');
      this.validacionesSobreValija();
    }
    // console.log(this.forma);
  }

  validacionesPaquete() {
    this.limpiarValidaciones();
    this.forma.get('tipoEntrega').setValidators(Validators.required);
    this.forma.get('tipoEntrega').updateValueAndValidity();
    this.forma.get('tipoEnvio').setValidators(Validators.required);
    this.forma.get('tipoEnvio').updateValueAndValidity();
    this.forma.get('largo').setValidators(Validators.required);
    this.forma.get('largo').setValue('');
    this.forma.get('largo').updateValueAndValidity();
    this.forma.get('ancho').setValidators(Validators.required);
    this.forma.get('ancho').setValue('');
    this.forma.get('ancho').updateValueAndValidity();
    this.forma.get('alto').setValidators(Validators.required);
    this.forma.get('alto').setValue('');
    this.forma.get('alto').updateValueAndValidity();
    this.forma.get('peso').setValidators(Validators.required);
    this.forma.get('peso').updateValueAndValidity();
    this.forma.get('peso').enable();
    this.forma.get('contenido').setValidators(Validators.required);
    this.forma.get('contenido').updateValueAndValidity();
  }

  validacionesSobreValija() {
    this.limpiarValidaciones();
    this.forma.get('tipoEntrega').setValidators(Validators.required);
    this.forma.get('tipoEntrega').updateValueAndValidity();
    this.forma.get('tipoEnvio').setValidators(Validators.required);
    this.forma.get('tipoEnvio').updateValueAndValidity();
    this.forma.get('peso').setValidators(Validators.required);
    this.forma.get('peso').setValue(1);
    // this.forma.get('peso').disable();
    this.forma.get('peso').updateValueAndValidity();
    this.forma.get('contenido').setValidators(Validators.required);
    this.forma.get('contenido').updateValueAndValidity();
    // this.forma.get('largo').setValidators(Validators.required);
    this.forma.get('largo').setValue(1);
    this.forma.get('largo').updateValueAndValidity();
    // this.forma.get('ancho').setValidators(Validators.required);
    this.forma.get('ancho').setValue(1);
    this.forma.get('ancho').updateValueAndValidity();
    // this.forma.get('alto').setValidators(Validators.required);
    this.forma.get('alto').setValue(1);
    this.forma.get('alto').updateValueAndValidity();
  }

  limpiarValidaciones() {
    Object.values( this.forma.controls ).forEach(control => {
      control.clearValidators();
      control.updateValueAndValidity();
    })
    // this.forma.get('tipoEntrega').clearValidators();

    // this.forma.get('tipoEnvio').clearValidators();
    // this.forma.get('largo').clearValidators();
    // this.forma.get('ancho').clearValidators();
    // this.forma.get('alto').clearValidators();
    // this.forma.get('peso').clearValidators();
    // this.forma.get('contenido').clearValidators();
  }

  onCobertura() {
    this.crearCoberturaDto();
    this.coberturaService.cobertura(this.coberturaDto)
    .subscribe(response => {
      console.log('Cobertura');
      this.coberturaResponse = response;
      console.log(this.coberturaResponse);
      // this.forma.get('tipoEntrega').disable();
      // console.log('1 opcion: ' + (this.coberturaResponse[0].isDomicilio == true) && (this.coberturaResponse[0].isOcurre == true));
      if (this.coberturaResponse.length > 0) {
        if (this.coberturaResponse[0].isDomicilio == true && this.coberturaResponse[0].isOcurre == true) {
          console.log('1 opcion: ' + (this.coberturaResponse[0].isDomicilio == true) && (this.coberturaResponse[0].isOcurre == true));
          this.opcionUno = true;
        } else if (this.coberturaResponse[0].isDomicilio == true && this.coberturaResponse[0].isOcurre == false) {
          console.log('2 opcion: ' + (this.coberturaResponse[0].isDomicilio == true) && (this.coberturaResponse[0].isOcurre == false));
          this.opcionDos = true;
        } else if (this.coberturaResponse[0].isDomicilio == false && this.coberturaResponse[0].isOcurre == true) {
          console.log('3 opcion: ' + (this.coberturaResponse[0].isDomicilio == false) && (this.coberturaResponse[0].isOcurre == true));
          this.opcionTres = true;
        } else {
          console.log('4 opcion: ' + (this.coberturaResponse[0].isDomicilio == false) && (this.coberturaResponse[0].isOcurre == false));
          this.opcionCuatro = true;
        }
      } else {
        this.opcionCuatro = true;
      }

      // console.log(response.length == 0);
      // console.log(typeof response[0] === undefined || response[0] == undefined);

      // this.sinServicio = false;
      // if (response[0] != undefined) {
      //   this.sinServicio = response[0].isDomicilio || response[0].isOcurre;
      // }

      // this.coberturaResponse = new CoberturaResponseModel(response.clave, response.domicilio, response.ocurre, response.tipoServicio, response.zona)

      // this.loading = false;
      // this.resultado = true;

      // console.log('Response:' ,response);
      // console.log('CoberturaRes: ',this.coberturaResponse);
      // console.log(this.coberturaResponse[0].clave);
      // console.log(this.coberturaResponse[0].domicilio);
      // console.log(this.coberturaResponse[0].ocurre);
    }, error => {
      // this.loading = false;
      window.alert('Error al comprobar cobertura');
    })
  }

  crearCoberturaDto () {
    this.coberturaDto.cpOrigen = this.origenService.getCPOrigen();
    this.coberturaDto.cpDestino = this.destinoService.getCPDestino();
  }

  onAtras() {}


}
