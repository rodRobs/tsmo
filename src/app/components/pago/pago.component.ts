import { TokenService } from './../../services/usuarios/token.service';
import { Vista } from './../../enums/vista.enum';
import { COTIZACION } from './../../enums/cotizacion.enum';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { EnvioService } from './../../services/envio/envio.service';
import { ClienteDto } from './../../models/dto/clienteDto.model';
import { PagoService } from './../../services/pago/pago.service';
import { DomicilioDto } from './../../models/dto/domicilioDto.model';
import { DocumentacionDto } from './../../models/dto/documentacionDto.model';
import { LegendaType } from './../../enums/legendas.enum';
import { CostoDto } from './../../models/dto/costoDto.model';
import { PaymentIntentDto } from './../../models/dto/paymentIntentDto.model';
import { ModalComponent } from './modal/modal.component';
import { Router } from '@angular/router';
import { CotizacionService } from 'src/app/services/cotizacion/cotizacion.service';
import { DocumentacionService } from './../../services/documentacion/documentacion.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElement,
  StripeElements,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { OpcionesDto } from 'src/app/models/dto/opcionesDto.model';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { DestinoDto } from 'src/app/models/dto/destinoDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NotificacionService } from 'src/app/services/notifacion/notificacion.service';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  path: string = '/app/app/';

  // Leyendas
  legenda: string = LegendaType.DatosPedido;
  origenLegenda: string = LegendaType.Origen;
  destinoLegenda: string = LegendaType.Destino;
  paqueteLegenda: string = LegendaType.Paquete;
  opcionesLegenda: string = LegendaType.Opciones;
  legendaCosto: string = LegendaType.CostoPedido;
  pagoLegenda: string = LegendaType.Pago;

  // Error cotizacion
  errorCotBool: boolean = false;
  errorCotizacion: string = '';
  formulario: boolean = false;

  // Promesas
  clienteProm: any;
  documentacionProm: any;
  envioProm: any;

  // Request
  proveedor: string = '';
  cotizacion: number = null;
  documentacion: number = null;

  // Tipo
  tipoCotizacion: number = null;

  // Boolean Pago - Guia
  guiaBoolean: boolean = false;
  guia: string = '';

  // Clientes Para UsuarioTSMO
  formCliente: FormGroup;
  clientes: ClienteDto[] = [];
  mostrarFormCliente: boolean = false; // Boolean para mostrar o esconder formulario de cliente
  clienteInput: number = 0;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  // Loading
  loading: boolean = true;
  loadingPago: boolean = false;

  costo: CostoDto = new CostoDto(null, '','','',null,null,null,null,null,null,null,null,null,null,null,null, null);
  documentacionDto: DocumentacionDto = new DocumentacionDto(null,'',new OpcionesDto('','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], new ServiciosDto('',''));
  clienteDto: ClienteDto = new ClienteDto(null, null, null, null, null);
  envioDto: EnvioDto = new EnvioDto(null, null, null, new DocumentacionDto(null,'',new OpcionesDto('','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], new ServiciosDto('','')), new ClienteDto(null, null, null, null, null), null, null, null, new UsuarioModel(null, null, null, null, null, null));

  // form: FormGroup;



  elements: StripeElements;
  // card: StripeElement;

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        padding: '10px',
        ':-webkit-autofill': {
          color: '#A8DADC',
        },
        '::placeholder': {
          color: '#A8DADC',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    }
  };

  stripeTest: FormGroup;

  @Input() precio;
  @Input() descripcion;
  @Input() nombre;

  error: string = '';

  pagoBool: boolean = true;

  perfil: string;

  constructor(
    public modalService: NgbModal,
    private documentacionService: DocumentacionService,
    private cotizacionService: CotizacionService,
    private fb: FormBuilder,
    private router: Router,
    private stripeService: StripeService,
    private pagoService: PagoService,
    private clienteService: ClienteService,
    private envioService: EnvioService,
    private tokenService: TokenService,
    private notificacionService: NotificacionService
  ) {
    this.crearFomulario();
    this.crearFormularioCliente();
  }

  ngOnInit(): void {
    this.tipoCotizacion = (window.location.pathname == `${this.path}/envio/pago`) ? COTIZACION.Clientes : COTIZACION.PersonalTSMO;
    this.onCotizar();
    this.seleccionarPerfil();
    // this.clienteProm = this.promesaGuardarCliente(this.clienteDto);
    // this.documentacionProm = this.promesaGuardarDocumentacion(this.documentacionDto);
    // this.envioProm = this.promesaGuardarEnvio(this.envioDto);
    // console.log("COTIZACION: ",this.documentacionService.getCotizacionDto());
    // console.log("DOCUMENTACION: ",this.documentacionService.getDocumentacion());
  }

  seleccionarPerfil() {
    this.tokenService.getAuthorities().forEach(perfil => {
      switch(perfil){
        case 'ROL_TSMO':
          this.perfil = perfil;
          this.listarClientes();

          break;
        case 'ROL_CLIENTE':
          this.perfil = perfil;
          break;
      }
    })
    if (this.tokenService.getToken()) {
      this.pagoBool = false;
    } else {
      this.pagoBool = true;
    }
  }

  crearFomulario() {
    this.stripeTest = this.fb.group({
      name: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      datos: ['', Validators.required]
    })
  }

  get nombreNoValido() { return this.stripeTest.get('name').touched && this.stripeTest.get('name').invalid; }
  get telefonoNoValido() { return this.stripeTest.get('telefono').touched && this.stripeTest.get('telefono').invalid; }
  get emailNoValido() { return this.stripeTest.get('email').touched && this.stripeTest.get('email').invalid; }
  get datosNoValido() { return this.stripeTest.get('datos').touched && this.stripeTest.get('datos').invalid; }

  onCotizar() {
    // console.log(this.documentacionService.getCotizacionDto());
    this.cotizacionService.onSolicitarCotizacionEnvio(this.documentacionService.getCotizacionDto())
    .subscribe(costo => {
      // console.log('Ceosto (Response): ',costo);
      document.getElementById('footer').style.position = 'relative';
      this.documentacionDto = this.documentacionService.getDocumentacion();
      this.formulario = true;
      this.loading = false;
      this.costo = costo;
      this.precio = costo.costoTotal;
      // Request
      this.proveedor = costo.realiza;
      this.cotizacion = costo.cotizacion['id'];
      this.cotizacionService.setIdCotizacion(this.cotizacion.toString());
      // localStorage.setItem('cotizacion', costo.id.toString());
      // this.mostrarPrecio = true;
      // this.precioService.setCosto(carga.precio.toString());
      // this.precio = carga.precio;
      // console.log(costo);
    }, error => {
      this.loading = false;
      this.errorCotBool = true;
      // console.log(error);
      if (typeof error === 'object') {
        // console.log('Object');
        // console.log(error['error']['msg']);
        // console.log(typeof error['error']['msg'] === 'undefined');
        if (typeof error['error']['msg'] === 'undefined') {
          // console.log('Undefined');
          // console.log(error);
          // console.log(Array.isArray(error['error']));
          if (Array.isArray(error['error'])) {
            error['error'].forEach(element => {
              this.errorCotizacion = this.errorCotizacion + element['msg'];
            })
          }

        } else {
          // console.log('No Undefined');
          // console.log(error);
          this.errorCotizacion = (error['status'] === 500) ? 'ERROR: Servidor falló' : error['error'];
        }
        // if (error['error'].isArray()) {
        //   error['error'].forEach(element => {
        //     console.log(element['msg']);
        //   })
        // }
      } else {
        // console.log('ERROR: ', error);

        this.errorCotizacion = (error['status'] === 500) ? 'ERROR: Servidor falló' : error['error'];
      }


      // console.log(error);
    })
  }

  createToken(): void {
    this.error = '';
    if ( this.stripeTest.invalid ) {
      this.markAllTouched();
      return;
    }
    this.loadingPago = true;
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            amount: this.precio * 100,
            currency: 'MXN',
            description: 'Envio de Pedido'
          }
          // console.log(paymentIntentDto);
          this.guardarCliente(paymentIntentDto);

          // this.pagoService.pagar(paymentIntentDto).subscribe(
          //   data => {
          //     console.log(data);
          //     this.abrirModal(data[`id`], this.nombre, data[`description`], data[`amount`], this.envioDto, this.documentacionDto);
          //     // this.router.navigate(['/']);
          //   }
          // );
          // this.error = '';
          // console.log(result.token.id);
          this.loadingPago = false;
        } else if (result.error) {
          // Error creating the token
          // console.log(result.error.message);
          this.error = result.error.message;
          this.loadingPago = false;
        }
      });
  }

  markAllTouched() {
    if (this.stripeTest.invalid) {
      Object.values( this.stripeTest.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  onSubmit() {}

  abrirModal(id: string, nombre: string, descripcion: string, precio: number, envioDto: EnvioDto, documentacionDto: DocumentacionDto) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.nombre = nombre;
    modalRef.componentInstance.descripcion = descripcion;
    modalRef.componentInstance.precio = precio;
    modalRef.componentInstance.envio = envioDto;
    modalRef.componentInstance.documentacion = documentacionDto;
    modalRef.componentInstance.proveedor = this.proveedor;
  }

  asignarDatos() {
    switch (this.stripeTest.get('datos').value) {
      case '0':
        this.stripeTest.get('name').setValue('');
        this.stripeTest.get('telefono').setValue('');
        this.stripeTest.get('email').setValue('');
        break;
      case '1':
        this.stripeTest.get('name').setValue(this.documentacionDto.origen.remitente);
        this.stripeTest.get('telefono').setValue(this.documentacionDto.origen.telefonos[0].numeroTelefono);
        this.stripeTest.get('email').setValue(this.documentacionDto.origen.email);
        break;
      case '2':
        this.stripeTest.get('name').setValue(this.documentacionDto.destino.destinatario);
        this.stripeTest.get('telefono').setValue(this.documentacionDto.destino.telefonos[0].numeroTelefono);
        this.stripeTest.get('email').setValue(this.documentacionDto.destino.email);
        break;
    }
  }

  //
  guardarCliente(paymentIntentDto: PaymentIntentDto) {
    this.clienteDto.correo = this.stripeTest.get('email').value;
    this.clienteDto.nombre = this.stripeTest.get('name').value;
    this.clienteDto.telefono = this.stripeTest.get('telefono').value;
    this.guardarClienteService(this.clienteDto);
    this.clienteService.guardarCliente(this.clienteDto)
    .subscribe(cliente => {
      this.envioDto.cliente.id = cliente.id;
      // console.log('EnvioDto agrega cliente.id: ',this.envioDto);
      this.guardarDocumentacion()
      .subscribe(data => {
        // console.log('data guardar Documentación: ',data);
        this.envioDto.documentacion.id = data['id'];
        this.envioDto.guiaProveedor = data['guia'];
        // console.log('Envio Dto (antes): ',this.envioDto);
        this.guardarEnvio(this.envioDto)
        .subscribe(data => {
          // console.log('Data (despues): ',data);
          this.envioDto = data;
          this.envioService.setGuia(this.envioDto.guiaTsmo);
          this.realizarPago(paymentIntentDto);
        }, error => {
          // console.log(error);
        })
      }, error => {
        // console.log(error);
      })
    }, error => {
      // console.log(error);
    })
  }

  guardarDocumentacion() {
    // console.log('Documentacion (guardar): ',this.documentacionDto);
    // console.log(this.proveedor);
    // console.log(this.cotizacion);
    return this.documentacionService.guardarPreDocumentacion(this.documentacionDto, this.proveedor, this.cotizacion);
  }

  guardarEnvio(envioDto: EnvioDto) {
    return this.envioService.guardar(envioDto, this.envioDto.cliente.id, this.envioDto.documentacion.id, this.proveedor, '1', 'rorro'/*this.tokenService.getUserName()*/);
  }

  realizarPago(paymentIntentDto: PaymentIntentDto) {
    this.pagoService.pagar(paymentIntentDto).subscribe(
      data => {
        // console.log(data);
        // console.log("nombre: ",this.nombre);
        this.abrirModal(data[`id`], this.stripeTest.get('name').value, data[`description`], data[`amount`], this.envioDto, this.documentacionDto);
        // this.router.navigate(['/']);
        this.guiaBoolean = true;
        this.guia = this.envioDto.guiaTsmo;
        // console.log("Get Guia Despues Modal: ");
        // console.log(this.envioService.getGuia());
      }
    );
    this.error = '';
  }

  // Regresar
  onRegresar() {
    switch(window.location.pathname) {
      case `${this.path}/envio/pago`:
        this.router.navigate(['/envio/paquete']);
        break;
      case `${this.path}/dashboard/envio/pago`:
        this.router.navigate(['/dashboard/envio/paquete']);
        break;
    }
  }

  guardarClienteService(cliente: ClienteDto) {
    this.clienteService.setNombre(cliente.nombre);
    this.clienteService.setCorreo(cliente.correo);
    this.clienteService.setTelCasa(cliente.telefono);
  }

  clienteSeleccionado() {
    if (this.clienteInput == 0) {
      this.mostrarErrorSeleccionarCliente = true;
    } else {
      this.mostrarErrorSeleccionarCliente = false;
    }
  }

  mostrarErrorSeleccionarCliente: boolean = false;
  contratarEnvio() {
    if (this.clienteInput == 0) {
      this.mostrarErrorSeleccionarCliente = true;
      return;
    }
    // console.log('Entra a contratar envio para usuarios registrados');
    // console.log(this.perfil);
    this.guardarDocumentacion()
    .subscribe(data => {
      // console.log(data);
      // console.log(data['id']);
      // console.log(data['guia']);

      // console.log(this.envioDto);
      this.envioDto.documentacion = data;
      this.envioDto.documentacion.id = data['id'];
      this.envioDto.guiaProveedor = data['guia'];
      this.envioDto.cliente.id = this.clienteInput;
      // this.envioDto.usuario.nombreUsuario = window.sessionStorage.getItem('AuthUserName');
      // console.log(this.envioDto);
      switch(this.perfil) {
        case 'ROL_TSMO':
          this.guardarEnvioUsuarioTSMO(this.envioDto)
          .subscribe(data => {
            console.log(data);
            this.envioDto = data;
            this.envioService.setGuia(this.envioDto.guiaTsmo);
            this.solicitarGuiaProveedor();
            this.notificarCorreoDocumento(this.envioDto);
          });
          break;
        case 'ROL_CLIENTE':
          this.guardarEnvioClienteTSMO(this.envioDto)
          .subscribe(data => {
            console.log(data);
            this.envioDto = data;
            this.envioService.setGuia(this.envioDto.guiaTsmo);
            this.solicitarGuiaProveedor();
            this.notificarCorreoDocumento(this.envioDto);
          });
          break;
      }

    })
  }

  guardarEnvioUsuarioTSMO(envioDto: EnvioDto) {
    return this.envioService.guardarUsuarioTSMO(envioDto, this.envioDto.documentacion.id, this.proveedor, '1', this.tokenService.getUserName());
  }

  guardarEnvioClienteTSMO(envioDto: EnvioDto) {
    return this.envioService.guardarClienteTSMO(envioDto, this.envioDto.documentacion.id, this.proveedor, '1', this.tokenService.getUserName());
  }

  solicitarGuiaProveedor() {

    // console.log(this.proveedor);
    if (this.proveedor == 'ENVIA') {
      // console.log('Entra a guardar ENVIA');
      this.documentacionService.obtenerGuiaProveedor(this.documentacionDto)
      .subscribe(guia => {
        // console.log("Guia: ",guia);
        this.envioDto.guiaProveedor = guia;
        //this.envioService.setGuia(guia);
        this.envioService.actualizarGuiaProveedor(this.envioDto)
        .subscribe(data => {
          this.router.navigate([Vista.EXITO_DASHBOARD]);
        }, error => {
          console.log(error);
        })
        // console.log(this.envio);
        // this.cambiarEstadoPago(APROBADO, this.envio)

      });
    } else {
      this.router.navigate([Vista.EXITO_DASHBOARD]);
    }
  }

  listarClientes() {
    this.clienteService.buscarTodosClientes()
    .subscribe(clientes => {
      this.clientes = clientes;
    })
  }

  crearFormularioCliente() {
    this.formCliente = this.fb.group({
      nombreCliente: ['', Validators.required],
      correoCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
      descuentoCliente: [{value: ''}, [Validators.required, Validators.min(0)]]
    })
  }

  get nombreClienteNoValido() { return this.formCliente.get('nombreCliente').invalid && this.formCliente.get('nombreCliente').touched; };
  get correoClienteNoValido() { return this.formCliente.get('correoCliente').invalid && this.formCliente.get('correoCliente').touched; };
  get telefonoClienteNoValido() { return this.formCliente.get('telefonoCliente').invalid && this.formCliente.get('telefonoCliente').touched; };
  get descuentoClienteNoValido() { return this.formCliente.get('descuentoCliente').invalid && this.formCliente.get('descuentoCliente').touched; };

  markAllTouchedClientes() {
    Object.values( this.formCliente.controls ).forEach(control => {
      control.markAllAsTouched();
    })
  }

  onGuardarCliente() {
    if (this.formCliente.invalid) {
      this.markAllTouchedClientes();
      return;
    }
    this.validarCliente();
  }

  mostrarFormularioCliente() {
    this.mostrarFormCliente = !this.mostrarFormCliente;
  }

  validarCliente() {
    if (this.formCliente.invalid && this.clienteInput == null) {
      this.markAllTouched();
    }
    this.clienteService.guardarCliente(this.asignarValoresCliente())
    .subscribe(cliente => {
      // console.log('Respuesta CLiente: ');
      // console.log(cliente);
      this.clienteInput = cliente.id;
      this.listarClientes();
    })
  }

  asignarValoresCliente() {
    return new ClienteDto(
      null,
      this.formCliente.get('nombreCliente').value,
      this.formCliente.get('correoCliente').value,
      this.formCliente.get('telefonoCliente').value,
      this.formCliente.get('descuentoCliente').value
    );
  }

  notificarCorreoDocumento(envio: EnvioDto) {
    this.notificacionService.enviarCorreoDeEnvioDocumento(envio.id)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

}
