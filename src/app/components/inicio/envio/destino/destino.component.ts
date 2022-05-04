import { DomicilioService } from './../../../../services/domicilio/domicilio.service';
import { ParrafoType } from 'src/app/enums/parrafo.enum';
import { CpService } from './../../../../services/codigo-postal/cp.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COTIZACION } from 'src/app/enums/cotizacion.enum';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { Vista } from 'src/app/enums/vista.enum';
import { DireccionDto } from 'src/app/models/dto/direccionDto.model';
import { DestinoService } from 'src/app/services/cotizacion/destino.service';
import { SwitchType } from 'src/app/enums/switch.enum';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {

  path: string = '/app/app/';

  lengend: string = LegendaType.Envio;
  legenda: string = LegendaType.TituloEnvio;
  parrafo: string = ParrafoType.EnvioDestino;

  forma: FormGroup;

  destino: DireccionDto = new DireccionDto('','','','','','','','');

  colonias: string[] = [];
  colonia: string = '';
  coloniaBoolean: boolean = false;

  cotizacion: number = 0;

  constructor(
    private destinoService: DestinoService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cpService: CpService,
    private domicilioService: DomicilioService
  ) {
    this.crearFormulario();
    this.cargarValoresDesdeService();
    this.existeCP();
  }

  ngOnInit(): void {
    this.cotizacion = (window.location.pathname == '/envio/destino') ? COTIZACION.Clientes : COTIZACION.PersonalTSMO;

  }

  crearFormulario() {
    this.forma = this.fb.group({
      destinatario: ['', Validators.required],
      destinatario_dos: [''],
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
    })
  }

  get destinatarioNoValido() { return this.forma.get('destinatario').invalid && this.forma.get('destinatario').touched; }
  get destanatarioDosNoValido() { return this.forma.get('destinatario_dos').invalid && this.forma.get('destinatario_dos').touched; }
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
    this.forma.get('destinatario').setValue(this.destinoService.getDestinatario());
    this.forma.get('destinatario_dos').setValue(this.destinoService.getDestinatarioDos());
    this.forma.get('email').setValue(this.destinoService.getCorreo());
    this.forma.get('cp').setValue(this.destinoService.getCPDestino());
    this.forma.get('colonia').setValue(this.destinoService.getColoniaDestino());
    this.forma.get('calle').setValue(this.destinoService.getCalleDestino());
    this.forma.get('numeroExt').setValue(this.destinoService.getNumeroExtDestino());
    this.forma.get('numeroInt').setValue(this.destinoService.getNumeroIntDestino());
    this.forma.get('ciudad').setValue(this.destinoService.getCiudadDestino());
    this.forma.get('estado').setValue(this.destinoService.getEstadoDestino());
    this.forma.get('telefono').setValue(this.destinoService.getTelefono());
    this.forma.get('referencia').setValue(this.destinoService.getReferenciaDestino());
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
    //   this.destinoService.setPais(response['response'].pais);
    // },
    // error => {
    //   this.coloniaBoolean = true;
    //   this.destinoService.setPais('MÚxico');
    // })
    this.domicilioService.buscarCP(this.forma.get('cp').value)
    .subscribe(response => {
      this.coloniaBoolean = false;
      this.colonias = response['asentamiento'];
      this.forma.get('ciudad').setValue(response['ciudad']);
      this.forma.get('estado').setValue(response['estado']);
      this.destinoService.setPais(response['pais']);
    },
    error => {
      this.coloniaBoolean = true;
      this.destinoService.setPais('México');
    })
  }

  guardarValoresService() {
    this.destinoService.setDestinatario(this.forma.get('destinatario').value);
    this.destinoService.setDestinatarioDos(this.forma.get('destinatario_dos').value);
    this.destinoService.setCorreo(this.forma.get('email').value);
    this.destinoService.setCPDestino(this.forma.get('cp').value);
    this.destinoService.setColoniaDestino(this.forma.get('colonia').value);
    this.destinoService.setCalleDestino(this.forma.get('calle').value);
    this.destinoService.setNumeroExtDestino(this.forma.get('numeroExt').value);
    this.destinoService.setNumeroIntDestino(this.forma.get('numeroInt').value);
    this.destinoService.setCiudadDestino(this.forma.get('ciudad').value);
    this.destinoService.setEstadoDestino(this.forma.get('estado').value);
    this.destinoService.setTelefono(this.forma.get('telefono').value);
    this.destinoService.setReferenciaDestino(this.forma.get('referencia').value);
  }

  onAtras() {
    this.guardarValoresService()
    switch(window.location.pathname) {
      case SwitchType.DESTINO:
        this.router.navigate([Vista.ORIGEN]);
        break;
      case SwitchType.DESTINO_DASHBOARD:
        this.router.navigate([Vista.ORIGEN_DASHBOARD]);
        break;
    }
  }

  onSiguiente() {
    console.log("Entra a siguiente: ");
    if (this.forma.invalid) { this.allTouched(); return; }
    this.guardarValoresService();
    console.log(window.location.pathname);
    console.log(SwitchType.DESTINO);
    console.log(SwitchType.DESTINO_DASHBOARD);
    switch(window.location.pathname) {
      case SwitchType.DESTINO:
        console.log(Vista.PAQUETE);
        this.router.navigate([Vista.PAQUETE]);
        break;
      case SwitchType.DESTINO_DASHBOARD:
        console.log(Vista.PAQUETE_DASHBOARD);
        this.router.navigate([Vista.PAQUETE_DASHBOARD]);
        break;
    }
  }
}

// sjNi#4rn
