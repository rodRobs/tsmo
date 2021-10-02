import { CoberturaDto } from './../../../../models/dto/cobertura.model';
import { CoberturaService } from './../../../../services/cobertura/cobertura.service';
import { CoberturaResponseModel } from './../../../../models/response/cobertura-response.model';
import { SwitchType } from 'src/app/enums/switch.enum';
import { PerfilType } from './../../../../enums/perfil.enum';
import { TokenService } from 'src/app/services/usuarios/token.service';
import { DocumentacionService } from './../../../../services/documentacion/documentacion.service';
import { EnvioService } from './../../../../services/envio/envio.service';
import { DocumentacionDto } from './../../../../models/dto/documentacionDto.model';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { DetalleDto } from './../../../../models/dto/detalleDto.model';
import { DestinoDto } from './../../../../models/dto/destinoDto.model';
import { OrigenDto } from './../../../../models/dto/origenDto.model';
import { OpcionesDto } from './../../../../models/dto/opcionesDto.model';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vista } from 'src/app/enums/vista.enum';
import { CotizacionDto } from 'src/app/models/dto/cotizacionDto.model';
import { PaqueteDto } from 'src/app/models/dto/paquete.model';
import { CotizacionService } from 'src/app/services/cotizacion/cotizacion.service';
import { DestinoService } from 'src/app/services/cotizacion/destino.service';
import { OrigenService } from 'src/app/services/cotizacion/origen.service';
import { PaqueteService } from 'src/app/services/cotizacion/paquete.service';
import { CargaService } from 'src/app/services/cotizacion/carga.service';
import { COTIZACION } from 'src/app/enums/cotizacion.enum';
import { TelefonosDto } from 'src/app/models/dto/telefonosDto.model';
import { DomicilioDto } from 'src/app/models/dto/domicilioDto.model';
import { DimensionesDto } from 'src/app/models/dto/dimensionesDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';


@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.css']
})
export class PaqueteComponent implements OnInit {

  path: string = '/app/app/';

  perfil: number;

  legend: string = LegendaType.Envio.toString();

  paquete: PaqueteDto = new PaqueteDto('','','','','','');
  cotizacion: CotizacionDto = new CotizacionDto(0,'',new OpcionesDto('','','','',''),new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','',new Date()),new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','',new Date()),[], new Date(),[]);
  opciones: OpcionesDto = new OpcionesDto('','','','','');
  origenDto: OrigenDto = new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date());
  destinoDto: DestinoDto = new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date());
  detalle: DetalleDto = new DetalleDto('','','',new DimensionesDto(null,null,null,null));
  documentacionDto: DocumentacionDto = new DocumentacionDto(null,'',new OpcionesDto('','','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], []);
  // Para realizar cobertura
  coberturaResponse: CoberturaResponseModel[] = [];
  coberturaDto: CoberturaDto = new CoberturaDto('','');
  // Activar tipo de entrega
  isDomicilio: boolean = true;
  isOcurre: boolean = true;

  opcionUno: boolean = false; // domicilio = true && ocurre = true
  opcionDos: boolean = false; // domicilio = true && ocurre = false
  opcionTres: boolean = false; // domicilio = false && ocurre = true
  opcionCuatro: boolean = false; // domicilio = false && ocurre = false

  forma: FormGroup;

  tipoEnvio: string = '';
  tipoEntrega: string = '';
  // Booleans
  tipoEnvioBoolean: boolean = false;
  tipoEntregaBoolean: boolean = false;

  servicio: number = 0;

  constructor(
    private paqueteService: PaqueteService,
    private router: Router,
    private cotizacionService: CotizacionService,
    private origenService: OrigenService,
    private destinoService: DestinoService,
    private cargaService: CargaService,
    private fb: FormBuilder,
    private envioService: EnvioService,
    private documentacionService: DocumentacionService,
    private tokenService: TokenService,
    private coberturaService: CoberturaService
  ) {
    this.crearFormulario();
    this.cargarValoresDesdeService();
  }

  ngOnInit(): void {
    let path = window.location.pathname;
    // console.log(path);
    // console.log(path == '/paquete');
    this.servicio = (path == SwitchType.PAQUETE) ? COTIZACION.Clientes : COTIZACION.PersonalTSMO;
    // this.paquete.largo = this.paqueteService.getLargo();
    // this.paquete.ancho = this.paqueteService.getAncho();
    // this.paquete.alto = this.paqueteService.getAlto();
    // this.paquete.peso = this.paqueteService.getPeso();
    // this.paquete.valor = this.paqueteService.getValor();
    // this.paquete.contenido = this.paqueteService.getContenido();
    //this.servicio = (window.location.pathname == 'paquete')
    this.seleccionTipoUsuario();
    this.onCobertura();
  }

  seleccionTipoUsuario() {
    if (this.tokenService.getAuthorities().length > 0) {
      this.tokenService.getAuthorities().forEach(perfil => {
        switch(perfil) {
          case 'ROL_TSMO':
            this.perfil = PerfilType.TSMO;
            break;
          case 'ROL_CLIENTE':
            this.perfil = PerfilType.CLIENTE;
            break;
        }
      })
    }
  }

  crearFormulario() {
    this.forma = this.fb.group({
      tipoRecoleccion: ['', Validators.required],
      tipoEntrega: ['', Validators.required],
      tipoEnvio: ['', Validators.required],
      largo: ['', /*Validators.required*/],
      ancho: ['', /*Validators.required*/],
      alto: ['', /*Validators.required*/],
      peso: ['', Validators.required],
      valor: [''],

      contenido: ['', Validators.required]
    });
  }

  get tipoEntregaNoValido() { return this.forma.get('tipoEntrega').invalid && this.forma.get('tipoEntrega').touched; }
  get tipoEnvioNoValido() { return this.forma.get('tipoEnvio').invalid && this.forma.get('tipoEnvio').touched; }
  get largoNoValido() { return this.forma.get('largo').invalid && this.forma.get('largo').touched; }
  get anchoNoValido() { return this.forma.get('ancho').invalid && this.forma.get('ancho').touched; }
  get altoNoValido() { return this.forma.get('alto').invalid && this.forma.get('alto').touched; }
  get pesoNoValido() { return this.forma.get('peso').invalid && this.forma.get('peso').touched; }
  get valorNoValido() { return this.forma.get('valor').invalid && this.forma.get('valor').touched; }
  get contenidoNoValido() { return this.forma.get('contenido').invalid && this.forma.get('contenido').touched; }
  get tipoRecoleccionNoValido() { return this.forma.get('tipoRecoleccion').invalid && this.forma.get('tipoRecoleccion').touched; }

  allTouched() {
    if (this.forma.invalid) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  cargarValoresDesdeService() {
    this.forma.get('tipoRecoleccion').setValue(this.paqueteService.getTipoRecoleccion());
    this.forma.get('tipoEntrega').setValue(this.paqueteService.getTipoEntrega());
    this.forma.get('tipoEnvio').setValue(this.paqueteService.getTipoEnvio());
    this.forma.get('largo').setValue(this.paqueteService.getLargo());
    this.forma.get('ancho').setValue(this.paqueteService.getAncho());
    this.forma.get('alto').setValue(this.paqueteService.getAlto());
    this.forma.get('peso').setValue(this.paqueteService.getPeso());
    this.forma.get('valor').setValue(this.paqueteService.getValor());
    this.forma.get('contenido').setValue(this.paqueteService.getContenido());

  }

  guardarValoresService() {
    // this.paqueteService.setTipoServicio(this.forma.get('tipoServicio').value);
    this.paqueteService.setTipoRecoleccion(this.forma.get('tipoRecoleccion').value);
    this.paqueteService.setTipoEntrega(this.forma.get('tipoEntrega').value);
    this.paqueteService.setTipoEnvio(this.forma.get('tipoEnvio').value);
    this.paqueteService.setLargo(this.forma.get('largo').value);
    this.paqueteService.setAncho(this.forma.get('ancho').value);
    this.paqueteService.setAlto(this.forma.get('alto').value);
    this.paqueteService.setPeso(this.forma.get('peso').value);
    this.paqueteService.setValor(this.forma.get('valor').value);
    this.paqueteService.setContenido(this.forma.get('contenido').value);
  }

  onAtras() {
    this.guardarValoresService()
    switch(window.location.pathname) {
      case SwitchType.PAQUETE:
        this.router.navigate([Vista.DESTINO]);
        break;
      case SwitchType.PAQUETE_DASHBOARD:
        this.router.navigate([Vista.DESTINO_DASHBOARD]);
        break;
    }
  }

  onSiguiente() {
    console.log(this.forma);
    if (this.forma.invalid) { this.allTouched(); return; }
    this.onCotizar(); // Guardar valores para realizar cotizacion en componente pago

  }

  crearObjetoCotizacion(): CotizacionDto{
    // this.cotizacion.origen.domicilio.codigoPostal = this.origenService.getCPOrigen();
    // this.cotizacion.origen.domicilio.colonia = this.origenService.getColoniaOrigen();
    // this.cotizacion.origen.domicilio.calle = this.origenService.getCalleOrigen();
    // this.cotizacion.origen.domicilio.numeroExt = this.origenService.getNumeroExtOrigen();
    // this.cotizacion.origen.domicilio.numeroInt = this.origenService.getNumeroIntOrigen();
    // this.cotizacion.origen.domicilio.ciudad = this.origenService.getCiudad();
    // this.cotizacion.origen.domicilio.estado = this.origenService.getEstadoOrigen();
    // this.cotizacion.origen.referencia = this.origenService.getReferencia();
    this.cotizacion.origen = this.origenDto;
    // this.cotizacion.destino.domicilio.codigoPostal = this.destinoService.getCPDestino();
    // this.cotizacion.destino.domicilio.colonia = this.destinoService.getColoniaDestino();
    // this.cotizacion.destino.domicilio.calle = this.destinoService.getCalleDestino();
    // this.cotizacion.destino.domicilio.numeroExt = this.destinoService.getNumeroExtDestino();
    // this.cotizacion.destino.domicilio.numeroInt = this.destinoService.getNumeroIntDestino();
    // this.cotizacion.destino.domicilio.ciudad = this.destinoService.getCiudadDestino();
    // this.cotizacion.destino.domicilio.estado = this.destinoService.getEstadoDestino();
    // this.cotizacion.destino.referencia = this.destinoService.getReferenciaDestino();
    this.cotizacion.destino = this.destinoDto;
    this.cotizacion.detalle.push(this.detalle);
    this.cotizacion.opciones.tipoCobro = this.opciones.tipoCobro;
    this.cotizacion.opciones.tipoEntrega = this.opciones.tipoEntrega;
    this.cotizacion.opciones.tipoEnvio = this.opciones.tipoEnvio;
    this.cotizacion.opciones.tipoServicio = this.opciones.tipoServicio;
    if (this.forma.get('tipoRecoleccion').value != "O") {
      this.cotizacion.servicios.push(new ServiciosDto(this.forma.get('tipoRecoleccion').value, '0'))
    }
    if (this.forma.get('valor').value != '' && this.forma.get('valor').value != null && this.forma.get('valor').value != undefined && this.forma.get('valor').value != 'null') {
      console.log('Entra a colocar servicio de seguro');
      this.cotizacion.servicios.push(new ServiciosDto("SEG", this.forma.get('valor').value) )
    }
    // this.cotizacion.detalle[0].dimensiones.largo = +this.paqueteService.getLargo();
    // this.cotizacion.detalle[0].dimensiones.ancho = +this.paqueteService.getAncho();
    // this.cotizacion.detalle[0].dimensiones.alto = +this.paqueteService.getAlto();
    // this.cotizacion.detalle[0].dimensiones.peso = +this.paqueteService.getPeso();
    // this.cotizacion.detalle[0].contenido = this.paqueteService.getContenido();
    // this.cotizacion.detalle[0].valorDeclarado = this.paqueteService.getValor();
    return this.cotizacion;
  }

  // onCotizar(form: NgForm) {
  //   if (form.invalid) { return; }
  //   this.guardarForm();
  //   if (this.servicio == COTIZACION.PersonalTSMO) {
  //     this.cotizacionService.onSolicitarCotizacion(this.crearObjetoCotizacion())
  //     .subscribe(carga => {
  //       console.log(carga);
  //       this.cargaService.setCarga(carga.carga);
  //       this.cargaService.setCxc(carga.cxc);
  //       // this.cargaService.setDomicilio(carga.domicilio);
  //       this.cargaService.setFlete(carga.flete);
  //       // this.cargaService.setId(carga.id);
  //       this.cargaService.setPrecio(carga.precio);
  //       // this.cargaService.setRecoleccion(carga.recoleccion);
  //       this.cargaService.setUtilidad(carga.utilidad);
  //       // this.cargaService.setPeso(carga.peso);
  //       this.router.navigate([Vista.COSTOS]);
  //     })
  //   } else if (this.servicio == COTIZACION.Clientes) {
  //     this.cotizacionService.onSolicitarCotizacionClientes(this.crearObjetoCotizacion())
  //     .subscribe(carga => {
  //       console.log(carga);
  //       this.cargaService.setPrecio(carga.precio);
  //       this.router.navigate([Vista.COSTOS_CLIENTE]);
  //     })
  //   }

  // }

  onCotizar() {
    console.log('On Cotizar');
    console.log(this.forma);
    this.guardarValoresService();
    this.crearOpciones();
    this.crearOrigen();
    this.crearDestino();
    this.crearDetalle();
    this.crearDocumentacion();
    this.documentacionService.setCotizacionDto(this.crearObjetoCotizacion());
    this.documentacionService.setDocumentacion(this.documentacionDto);
    console.log(this.documentacionDto);
    // this.router.navigate([Vista.PAGO_CLIENTE]);
    switch(window.location.pathname) {
      case SwitchType.PAQUETE:
        this.router.navigate([Vista.PAGO_CLIENTE]);
        break;
      case SwitchType.PAQUETE_DASHBOARD:
        this.router.navigate([Vista.PAGO_DASHBOARD]);
        break;
    }
    // this.cotizacionService.onSolicitarCotizacionClientes(this.crearObjetoCotizacion())
    // .subscribe(carga => {

    // })
  }

  onFinalizar(paquete: boolean) {

    if (this.forma.invalid) { this.allTouched(); return; }
    // if(this.tipoEntrega == '') { this.tipoEntregaBoolean = true; } else {  }
    // if (this.tipoEnvio == '') { this.tipoEnvioBoolean = true; }
    // if (this.tipoEntregaBoolean || this.tipoEnvioBoolean) { return; }
    // console.log(paquete);
    // if(paquete) {
    //   if ( this.forma.invalid ) {
    //     this.allTouched();
    //     return; }
    // }
    this.guardarValoresService();
    this.crearOpciones();
    this.crearOrigen();
    this.crearDestino();
    this.crearDetalle();
    this.crearDocumentacion();
    console.log(this.documentacionDto);
    // this.envioService.documentacion(this.documentacionDto)
    // .subscribe(response => {
    //   // console.log(response);
    // })
    // console.log(this.opciones);
    // console.log(this.origenDto);
    // console.log(this.destinoDto);
    // console.log(this.detalle);

  }

  crearOpciones() {
    // console.log('Crea opciones');
    this.opciones.tipoCobro = '';
    this.opciones.tipoEntrega = this.forma.get('tipoEntrega').value;
    this.opciones.tipoEnvio = this.forma.get('tipoEnvio').value;
    this.opciones.tipoRecoleccion = this.forma.get('tipoRecoleccion').value;
    // this.opciones.tipoServicio = '3';
  }

  crearOrigen() {
    // console.log('Crea Origen');
    this.origenDto.remitente = this.origenService.getRemitente();
    this.origenDto.email = this.origenService.getCorreo();
    this.origenDto.telefonos.push(new TelefonosDto(this.origenService.getTelefono()));
    this.origenDto.referencia = this.origenService.getReferencia();
    this.origenDto.domicilio.calle = this.origenService.getCalleOrigen();
    this.origenDto.domicilio.ciudad = this.origenService.getCiudad();
    this.origenDto.domicilio.codigoPostal = this.origenService.getCPOrigen();
    this.origenDto.domicilio.colonia = this.origenService.getColoniaOrigen();
    this.origenDto.domicilio.estado = this.origenService.getEstadoOrigen();
    this.origenDto.domicilio.numeroExt = this.origenService.getNumeroExtOrigen();
    this.origenDto.domicilio.numeroInt = this.origenService.getNumeroIntOrigen();
    this.origenDto.domicilio.pais = this.origenService.getPais();
  }

  crearDestino() {
    // console.log('Crea Destino');
    this.destinoDto.destinatario = this.destinoService.getDestinatario();
    this.destinoDto.email = this.destinoService.getCorreo();
    this.destinoDto.telefonos.push(new TelefonosDto(this.destinoService.getTelefono()));
    this.destinoDto.referencia = this.destinoService.getReferenciaDestino();
    this.destinoDto.domicilio.calle = this.destinoService.getCalleDestino();
    this.destinoDto.domicilio.ciudad = this.destinoService.getCiudadDestino();
    this.destinoDto.domicilio.codigoPostal = this.destinoService.getCPDestino();
    this.destinoDto.domicilio.colonia = this.destinoService.getColoniaDestino();
    this.destinoDto.domicilio.estado = this.destinoService.getEstadoDestino();
    this.destinoDto.domicilio.numeroExt = this.destinoService.getNumeroExtDestino();
    this.destinoDto.domicilio.numeroInt = this.destinoService.getNumeroIntDestino();
    this.destinoDto.domicilio.pais = this.destinoService.getPais();
  }

  crearDetalle() {
    // console.log('Crea Detalle');
    this.detalle.contenido = this.forma.get('contenido').value;
    this.detalle.identificador = '1';
    this.detalle.valorDeclarado = this.forma.get('valor').value;
    this.detalle.dimensiones.alto = this.forma.get('alto').value;
    this.detalle.dimensiones.ancho = this.forma.get('ancho').value;
    this.detalle.dimensiones.largo = this.forma.get('largo').value;
    this.detalle.dimensiones.peso = this.forma.get('peso').value;
  }

  crearDocumentacion() {
    console.log('Crea Documentacion');
    this.documentacionDto.opciones = this.opciones;
    this.documentacionDto.origen = this.origenDto;
    this.documentacionDto.destino = this.destinoDto;
    this.documentacionDto.detalle.push(this.detalle);
    this.documentacionDto.servicios = this.cotizacion.servicios;
  }

  contratar() {
    // console.log('Entra a contratar ');
    // console.log(this.tokenService.getUserName());
    // console.log(this.forma);
    if(this.forma.invalid) {
      this.allTouched(); return;
    }
    // console.log('Pasa a contratar');
    // console.log(this.perfil);
  }

  pago() {
    // console.log('Entra a pagar');
    // console.log(this.tokenService.getUserName());
    // console.log(this.forma);
    if(this.forma.invalid) {
      this.allTouched(); return;
    }
    // console.log('Pasa a pago');
    // console.log(this.perfil);
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

}
