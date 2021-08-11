import { DomicilioService } from './../../../../services/domicilio/domicilio.service';
import { Vista } from './../../../../enums/vista.enum';
import { ParrafoType } from './../../../../enums/parrafo.enum';
import { CpService } from './../../../../services/codigo-postal/cp.service';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COTIZACION } from 'src/app/enums/cotizacion.enum';
import { DireccionDto } from 'src/app/models/dto/direccionDto.model';
import { DomicilioDto } from 'src/app/models/dto/domicilioDto.model';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { OrigenService } from 'src/app/services/cotizacion/origen.service';
import { TelefonosDto } from 'src/app/models/dto/telefonosDto.model';
import { SwitchType } from 'src/app/enums/switch.enum';

@Component({
  selector: 'app-origen',
  templateUrl: './origen.component.html',
  styleUrls: ['./origen.component.css']
})
export class OrigenComponent implements OnInit {

  path: string = '/app/app/';

  legend: string = LegendaType.Envio;
  legenda: string = LegendaType.TituloEnvio;
  parrafo: string = ParrafoType.EnvioOrigen;

  colonias: string[] = [];
  colonia: string = '';
  coloniaBoolean: boolean = true;

  origen: OrigenDto = new OrigenDto('', new DomicilioDto('', '', '', '', '', '', '', ''), [new TelefonosDto('')], '', '', new Date());
  cotizacion: number = 0;

  forma: FormGroup;

  constructor(
    private http: HttpClient,
    private origenService: OrigenService,
    private router: Router,
    private fb: FormBuilder,
    private cpService: CpService,
    private domicilioService: DomicilioService
    ) {
      this.crearFormulario();
      this.cargarValoresDesdeService();
      this.existeCP();
      // this.comprobarColonia();
    }

  ngOnInit(): void {
    // Revisamos Path; Si es Para clientes externos o usuarios
  }

  crearFormulario() {
    this.forma = this.fb.group({
      remitente: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      cp: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExt: ['', Validators.required],
      numeroInt: [''],
      ciudad: [{value: '', disabled: false}, Validators.required],
      estado: [{value: '', disabled: false}, Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      referencia: ['', Validators.required]
    });
  }

  get remitenteNoValido() { return this.forma.get('remitente').invalid && this.forma.get('remitente').touched; }
  get emailNoValido() { return this.forma.get('email').invalid && this.forma.get('email').touched; }
  get cpNovalido() {return this.forma.get('cp').invalid && this.forma.get('cp').touched; }
  get coloniaNovalido() {return this.forma.get('colonia').invalid && this.forma.get('colonia').touched; }
  get calleNovalido() {return this.forma.get('calle').invalid && this.forma.get('calle').touched; }
  get numeroExtNovalido() {return this.forma.get('numeroExt').invalid && this.forma.get('numeroExt').touched; }
  get numeroIntNovalido() {return this.forma.get('numeroInt').invalid && this.forma.get('numeroInt').touched; }
  get ciudadNovalido() {return this.forma.get('ciudad').invalid && this.forma.get('ciudad').touched; }
  get estadoNovalido() {return this.forma.get('estado').invalid && this.forma.get('estado').touched; }
  get telefonoNoValido() {return this.forma.get('telefono').invalid && this.forma.get('telefono').touched; }
  get referenciaNoValido() {return this.forma.get('referencia').invalid && this.forma.get('referencia').touched; }

  allTouched() {
    if (this.forma.invalid) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  cargarValoresDesdeService() {
    this.forma.get('remitente').setValue(this.origenService.getRemitente());
    this.forma.get('email').setValue(this.origenService.getCorreo());
    this.forma.get('cp').setValue(this.origenService.getCPOrigen());
    this.forma.get('colonia').setValue(this.origenService.getColoniaOrigen());
    this.forma.get('calle').setValue(this.origenService.getCalleOrigen());
    this.forma.get('numeroExt').setValue(this.origenService.getNumeroExtOrigen());
    this.forma.get('numeroInt').setValue(this.origenService.getNumeroIntOrigen());
    this.forma.get('ciudad').setValue(this.origenService.getCiudad());
    this.forma.get('estado').setValue(this.origenService.getEstadoOrigen());
    this.forma.get('telefono').setValue(this.origenService.getTelefono());
    this.forma.get('referencia').setValue(this.origenService.getReferencia());
  }

  existeCP() {
    if (this.forma.get('cp').value != '') {
      this.onBuscarCP();
    }
  }

  onBuscarCP() {
    // console.log("Entra a buscar CP");
    if(this.forma.get('cp').value.length < 5) { return; }
    // this.http.get<any>(`${URL_CP}${this.forma.get('cp').value}?type=simplified`)
    // this.cpService.consultarCP(this.forma.get('cp').value)
    // .subscribe(response => {
    //   this.coloniaBoolean = false;
    //   this.colonias = response['response'].asentamiento;
    //   this.forma.get('ciudad').setValue(response['response'].ciudad);
    //   this.forma.get('estado').setValue(response['response'].estado);
    //   this.origenService.setPais(response['response'].pais);
    // },
    // error => {
    //   this.coloniaBoolean = true;
    //   this.origenService.setPais('MÚxico');
    // })
    this.domicilioService.buscarCP(this.forma.get('cp').value)
    .subscribe(response => {
      this.coloniaBoolean = false;
      this.colonias = response['asentamiento'];
      this.forma.get('ciudad').setValue(response['ciudad']);
      this.forma.get('estado').setValue(response['estado']);
      this.origenService.setPais(response['pais']);
    },
    error => {
      this.coloniaBoolean = true;
      this.origenService.setPais('México');
    })
  }


  onSiguiente() {
    if (this.forma.invalid) { this.allTouched(); return; }
    this.guardarValoresService();
    console.log(SwitchType.ORIGEN);
    console.log(Vista.DESTINO);
    console.log(window.location.pathname);
    console.log(SwitchType.ORIGEN == window.location.pathname);
    switch(window.location.pathname) {
      case SwitchType.ORIGEN:
        this.router.navigate([Vista.DESTINO]);
        break;
      case SwitchType.ORIGEN_DASHBOARD:
        this.router.navigate([Vista.DESTINO_DASHBOARD]);
        break;
    }
    // if(this.cotizacion == COTIZACION.PersonalTSMO) {
    //   this.router.navigate([Vista.DESTINO]);
    // } else if (this.cotizacion == COTIZACION.Clientes) {
    //   this.router.navigate([Vista.DESTINO_CLIENTE])
    // }
  }

  guardarValoresService() {
    this.origenService.setRemitente(this.forma.get('remitente').value);
    this.origenService.setCorreo(this.forma.get('email').value);
    this.origenService.setCPOrigen(this.forma.get('cp').value);
    this.origenService.setColoniaOrigen(this.forma.get('colonia').value);
    this.origenService.setCalleOrigen(this.forma.get('calle').value);
    this.origenService.setNumeroExtOrigen(this.forma.get('numeroExt').value);
    this.origenService.setNumeroIntOrigen(this.forma.get('numeroInt').value);
    this.origenService.setCiudad(this.forma.get('ciudad').value);
    this.origenService.setEstadoOrigen(this.forma.get('estado').value);
    this.origenService.setTelefono(this.forma.get('telefono').value);
    this.origenService.setReferencia(this.forma.get('referencia').value);
  }

  // comprobarColonia() {
  //   if(this.forma.get('colonia').value != '') {
  //     this.coloniaBoolean = true;
  //   }
  // }

}
