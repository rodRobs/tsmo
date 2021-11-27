import { ValidadoresService } from './../../services/validadores/validadores.service';
import { CostoDto } from 'src/app/models/dto/costoDto.model';
import { CoberturaResponseModel } from 'src/app/models/response/cobertura-response.model';
import { CoberturaDto } from './../../models/dto/cobertura.model';
import { CoberturaService } from './../../services/cobertura/cobertura.service';
import { SwitchType } from 'src/app/enums/switch.enum';
import { Vista } from './../../enums/vista.enum';
import { Router } from '@angular/router';
import { DetalleDto } from './../../models/dto/detalleDto.model';
import { TelefonosDto } from './../../models/dto/telefonosDto.model';
import { PrecioService } from './../../services/precio/precio.service';
import { CotizacionService } from 'src/app/services/cotizacion/cotizacion.service';
import { CpService } from './../../services/codigo-postal/cp.service';
import { CotizacionDto } from './../../models/dto/cotizacionDto.model';
import { PaqueteService } from './../../services/cotizacion/paquete.service';
import { DestinoService } from './../../services/cotizacion/destino.service';
import { OrigenService } from './../../services/cotizacion/origen.service';
import { InstruccionesType } from './../../enums/instrucciones.enum';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from '@angular/forms';
import { ParrafoType } from 'src/app/enums/parrafo.enum';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { Component, OnInit } from '@angular/core';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { DomicilioDto } from 'src/app/models/dto/domicilioDto.model';
import { DestinoDto } from 'src/app/models/dto/destinoDto.model';
import { DimensionesDto } from 'src/app/models/dto/dimensionesDto.model';
import { OpcionesDto } from 'src/app/models/dto/opcionesDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';

const URL_CP = 'https://api-sepomex.hckdrk.mx/query/info_cp/';
@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  path: string = '/app/app/';

  legenda: string = LegendaType.Cotizacion;
  legendaCosto: string = LegendaType.CostoCotizacion;
  parrafo: string = ParrafoType.Cotizar;
  instrucciones: string = InstruccionesType.Cotizacion;

  cotizacion: CotizacionDto = new CotizacionDto(0,'',new OpcionesDto('','','','',''),new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','',new Date()),new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','',new Date()),[], new Date(),[], new CostoDto(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null));
  detalle: DetalleDto = new DetalleDto('','','',new DimensionesDto(null,null,null,null));

  forma: FormGroup;

  loading:boolean = false;
  paquete: boolean = false;

  mostrarPrecio: boolean = false;
  precio: number = 0;
  servicio: string = '';
  fechaEntregaAprox: string = '';

  // Cobertura
  coberturaResponse: CoberturaResponseModel[] = [];
  opcionUno: boolean = true;
  opcionDos: boolean = false;
  opcionTres: boolean = false;
  opcionCuatro: boolean = false;

  mostrarLegendaSeguro: boolean = false;

  submmit: boolean = false;

  costo: CostoDto = new CostoDto(null, '','','',null,null,null,null,null,null,null,null,null,null,null,null, null, null, null);


  constructor(
    private fb: FormBuilder,
    private origenService: OrigenService,
    private destinoService: DestinoService,
    private paqueteService: PaqueteService,
    private cpService: CpService,
    private cotizacionService: CotizacionService,
    private precioService: PrecioService,
    private router: Router,
    private coberturaService: CoberturaService,
    private ValidadoresService: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarValoresService();
    this.existeCPOrigen();
    this.existeCPDestino();
    this.onCobertura();
  }

  ngOnInit(): void {

  }

  crearFormulario() {
    this.forma = this.fb.group({
      origen: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern("^[0-9]*$")]/*, this.ValidadoresService.existeCobertura*/],
      destino: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern("^[0-9]*$")]/*, this.ValidadoresService.existeCobertura*/],
      tipoRecoleccion: ['', Validators.required],
      tipoEntrega: ['', Validators.required],
      tipoEnvio: ['', Validators.required],
      valor: [''],
      largo: ['', Validators.required],
      alto: ['', Validators.required],
      ancho: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get origenNoValido() { return this.forma.get('origen').invalid && this.forma.get('origen').touched; };
  get destinoNoValido() { return this.forma.get('destino').invalid && this.forma.get('destino').touched; };
  get tipoRecoleccionNoValido() { return this.forma.get('tipoRecoleccion').invalid && this.forma.get('tipoRecoleccion').touched; };
  get tipoEntregaNoValido() { return this.forma.get('tipoEntrega').invalid && this.forma.get('tipoEntrega').touched; };
  get tipoEnvioNoValido() { return this.forma.get('tipoEnvio').invalid && this.forma.get('tipoEnvio').touched; };
  get valorNoValido() { return this.forma.get('valor').invalid && this.forma.get('valor').touched; };
  get largoNoValido() { return this.forma.get('largo').invalid && this.forma.get('largo').touched; };
  get altoNoValido() { return this.forma.get('alto').invalid && this.forma.get('alto').touched; };
  get anchoNoValido() { return this.forma.get('ancho').invalid && this.forma.get('ancho').touched; };
  get pesoNoValido() { return this.forma.get('peso').invalid && this.forma.get('peso').touched; };

  get origenPatternNoValido() { return this.forma.get('origen').invalid && this.forma.get('origen').errors['pattern']; };
  // get origenMinLengthNoValido() { return this.forma.get('origen').invalid && this.forma.get('origen').errors['minLength'];}
  get destinoPatternNoValido() { return this.forma.get('destino').invalid && this.forma.get('destino').errors['pattern']; };

  // activarValidaciones() {
  //   this.paquete = true;
  //   this.forma.get('valor').setValidators(Validators.required);
  //   this.forma.get('largo').setValidators(Validators.required);
  //   this.forma.get('alto').setValidators(Validators.required);
  //   this.forma.get('ancho').setValidators(Validators.required);
  //   this.forma.get('peso').setValidators(Validators.required);
  // }

  // desactivarValidaciones() {
  //   this.paquete = false;
  //   this.forma.get('valor').clearValidators;
  //   this.forma.get('largo').clearValidators;
  //   this.forma.get('alto').clearValidators;
  //   this.forma.get('ancho').clearValidators;
  //   this.forma.get('peso').clearValidators;
  // }

  allTouched() {
    if (this.forma.invalid) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  msg: string; errorBool: boolean = false;
  onCotizar() {
    this.valoresResetOpciones();
    this.mostrarPrecio = false;
    this.errorBool = false;
    this.submmit = true;
    // console.log(this.forma);
    localStorage.clear();
    this.loading = true;
    // console.log("Entra a boton cotizar");
    // console.log(this.forma);
    if ( this.forma.invalid ) {
      // console.log('Invalido');
      this.allTouched();
      this.loading = false;
      return;
    }
    this.guardarValoresEnServicios();
    this.asignarACotizacion();
    console.log('Cotizacion enviar: ',this.cotizacion);

    this.cotizacionService.onSolicitarCotizacionClientes(this.cotizacion)
    .subscribe(response => {
      console.log('Response; ',response);
      // console.log('Response: ',response.costo);
      this.costo = response.costo;
      this.loading = false;
      this.mostrarPrecio = true;
      this.precioService.setCosto(response.costo.costoTotal.toString());
      this.precio = response.costo.costoTotal;
      this.servicio = response.costo.tipoServicio;
      this.fechaEntregaAprox = response.costo.fcompromisoEntrega;
      //window.location.href = '#precio';
      // console.log(costo);
    }, error => {
      this.errorBool = true;
      error['error'].forEach(element => {
        this.msg = element.msg + " ";
      });
      this.loading = false;
    })

  }

  guardarValoresEnServicios() {
    this.origenService.setCPOrigen(this.forma.get('origen').value);
    this.origenService.setCiudad(this.cotizacion.origen.domicilio.ciudad);
    this.origenService.setEstadoOrigen(this.cotizacion.origen.domicilio.estado);
    this.origenService.setPais(this.cotizacion.origen.domicilio.pais);
    this.destinoService.setCPDestino(this.forma.get('destino').value);
    this.destinoService.setCiudadDestino(this.cotizacion.destino.domicilio.ciudad);
    this.destinoService.setEstadoDestino(this.cotizacion.destino.domicilio.estado);
    this.destinoService.setPais(this.cotizacion.destino.domicilio.pais);
    this.paqueteService.setAlto(this.forma.get('alto').value);
    this.paqueteService.setAncho(this.forma.get('ancho').value);
    this.paqueteService.setLargo(this.forma.get('largo').value);
    this.paqueteService.setPeso(this.forma.get('peso').value);
    this.paqueteService.setValor(this.forma.get('valor').value);
    this.paqueteService.setTipoEntrega(this.forma.get('tipoEntrega').value);
    this.paqueteService.setTipoEnvio(this.forma.get('tipoEnvio').value);
    this.paqueteService.setTipoServicio(this.servicio);
    this.paqueteService.setTipoRecoleccion(this.forma.get('tipoRecoleccion').value);
  }

  cargarValoresService() {
    this.forma.get('origen').setValue(this.origenService.getCPOrigen());
    this.cotizacion.origen.domicilio.ciudad = this.origenService.getCiudad();
    this.cotizacion.origen.domicilio.estado = this.origenService.getEstadoOrigen();
    this.cotizacion.origen.domicilio.pais = this.origenService.getPais();
    this.forma.get('destino').setValue(this.destinoService.getCPDestino());
    this.cotizacion.destino.domicilio.ciudad = this.destinoService.getCiudadDestino();
    this.cotizacion.destino.domicilio.estado = this.destinoService.getEstadoDestino();
    this.cotizacion.destino.domicilio.pais = this.destinoService.getPais();
    this.forma.get('tipoEntrega').setValue(this.paqueteService.getTipoEntrega());
    this.forma.get('tipoEnvio').setValue(this.paqueteService.getTipoEnvio());
    this.forma.get('alto').setValue(this.paqueteService.getAlto());
    this.forma.get('largo').setValue(this.paqueteService.getLargo());
    this.forma.get('ancho').setValue(this.paqueteService.getAncho());
    this.forma.get('peso').setValue(this.paqueteService.getPeso());
    this.forma.get('valor').setValue(this.paqueteService.getValor());
    this.forma.get('tipoRecoleccion').setValue(this.paqueteService.getTipoRecoleccion());
  }

  onBuscarCPOrigen() {
    // console.log(this.forma.controls);
    // if(this.forma.get('origen').invalid) { return; }
    // this.cpService.consultarCP(this.forma.get('origen').value)
    // .subscribe(response => {
    //   // console.log(response);
    //   this.cotizacion.origen.domicilio.ciudad = response['response'].ciudad;
    //   this.cotizacion.origen.domicilio.estado = response['response'].estado;
    //   this.cotizacion.origen.domicilio.pais = response['response'].pais;
    //   // this.cotizacion.origen.domicilio. = response['response'].municipio;
    //   this.cotizacion.origen.domicilio.codigoPostal = this.forma.get('origen').value;
    // }, error => {
    //   // console.log(error);
    // })
  }

  onBuscarCPDestino() {
    // console.log(this.forma.controls);
    // if(this.forma.get('destino').invalid) { return; }
    // this.cpService.consultarCP(this.forma.get('destino').value)
    // .subscribe(response => {
    //   // console.log(response);
    //   this.cotizacion.destino.domicilio.ciudad = response['response'].ciudad;
    //   this.cotizacion.destino.domicilio.estado = response['response'].estado;
    //   this.cotizacion.destino.domicilio.pais = response['response'].pais;
    //   // this.cotizacion.delegacionDestino = response['response'].municipio;
    //   this.cotizacion.destino.domicilio.codigoPostal = this.forma.get('destino').value;
    // }, error => {
    //   // console.log(error);
    // })
  }

  asignarACotizacion() {
    this.cotizacion = new CotizacionDto(0,'',new OpcionesDto('','','','',''),new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','',new Date()),new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','',new Date()),[], new Date(),[],new CostoDto(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null));
    this.cotizacion.detalle = [];
    this.cotizacion.origen.domicilio.codigoPostal = this.forma.get('origen').value;
    this.cotizacion.destino.domicilio.codigoPostal = this.forma.get('destino').value;
    this.cotizacion.opciones.tipoEnvio = this.forma.get('tipoEnvio').value;
    this.cotizacion.opciones.tipoEntrega = this.forma.get('tipoEntrega').value;
    this.detalle.dimensiones.largo = this.forma.get('largo').value;
    this.detalle.dimensiones.ancho = this.forma.get('ancho').value;
    this.detalle.dimensiones.alto = this.forma.get('alto').value;
    this.detalle.dimensiones.peso = this.forma.get('peso').value;
    // this.detalle.valorDeclarado = this.forma.get('valor').value;
    this.cotizacion.detalle.push(this.detalle);
    if (this.forma.get('tipoRecoleccion').value != "O") {
      this.cotizacion.servicios.push(new ServiciosDto(this.forma.get('tipoRecoleccion').value, '0'))
    }
    if (this.forma.get('valor').value != '' && this.forma.get('valor').value != null && this.forma.get('valor').value != undefined && this.forma.get('valor').value != 'null') {
      console.log('Entra a colocar servicio de seguro');
      this.cotizacion.servicios.push(new ServiciosDto("SEG", this.forma.get('valor').value) )
    }
    // this.cotizacion.recoleccion
    // this.cotizacion.detalle[0].dimensiones.largo = this.forma.get('largo').value;
    // this.cotizacion.detalle[0].dimensiones.ancho = this.forma.get('ancho').value;
    // this.cotizacion.detalle[0].dimensiones.alto = this.forma.get('alto').value;
    // this.cotizacion.detalle[0].dimensiones.peso = this.forma.get('peso').value;
    // this.cotizacion.detalle[0].valorDeclarado = this.forma.get('valor').value;
  }

  existeCPOrigen() {
    if (this.forma.get('origen').value != '') {
      this.onBuscarCPOrigen();
    }
  }

  existeCPDestino() {
    if (this.forma.get('destino').value != '') {
      this.onBuscarCPDestino();
    }
  }

  onRouter() {
    // console.log(window.location.pathname);
    switch(window.location.pathname) {
      case SwitchType.COTIZACION_:
        this.router.navigate([Vista.ORIGEN]);
        break;
      case SwitchType.COTIZACION:
        // console.log(`Entra a ${this.path}/cotizacion`);
        this.router.navigate([Vista.ORIGEN]);
        break;
      case SwitchType.COTIZACION_DASHBOARD:
        // console.log(`Entra a ${this.path}/dashboard/cotizacion`);
        this.router.navigate([Vista.ORIGEN_DASHBOARD]);
        break;
    }
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
    this.forma.get('peso').setValue(0);
    this.forma.get('peso').enable();
    this.forma.get('peso').setValidators(Validators.required);
    this.forma.get('peso').updateValueAndValidity();
  }

  validacionesSobreValija() {
    this.limpiarValidaciones();
    this.forma.get('tipoEntrega').setValidators(Validators.required);
    this.forma.get('tipoEntrega').updateValueAndValidity();
    this.forma.get('tipoEnvio').setValidators(Validators.required);
    this.forma.get('tipoEnvio').updateValueAndValidity();
    this.forma.get('peso').setValidators(Validators.required);
    this.forma.get('peso').setValue(1);
    this.forma.get('peso').disable();
    this.forma.get('peso').updateValueAndValidity();
    // this.forma.get('largo').setValidators(Validators.required);
    this.forma.get('largo').setValue(0);
    this.forma.get('largo').updateValueAndValidity();
    // this.forma.get('ancho').setValidators(Validators.required);
    this.forma.get('ancho').setValue(0);
    this.forma.get('ancho').updateValueAndValidity();
    // this.forma.get('alto').setValidators(Validators.required);
    this.forma.get('alto').setValue(0);
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

  msgError: string;
  coberturaBool: boolean;
  onCobertura() {
    this.errorBool = false;
    this.coberturaBool = false;
    this.mostrarPrecio = false;
    this.valoresResetOpciones();
    if (this.forma.get('origen').value.length != 5 || this.forma.get('destino').value.length != 5) { return; }
    let coberturaDto: CoberturaDto = new CoberturaDto(this.forma.get('origen').value, this.forma.get('destino').value);
    this.coberturaService.cobertura(coberturaDto)
    .subscribe(response => {
      // console.log(response);
      this.coberturaBool = true;
      this.coberturaResponse = response;
      if (this.coberturaResponse.length > 0) {
        if (this.coberturaResponse[0].isDomicilio == true && this.coberturaResponse[0].isOcurre == true) {
          // console.log('1 opcion: ' + (this.coberturaResponse[0].isDomicilio == true) && (this.coberturaResponse[0].isOcurre == true));
          this.opcionUno = true;
        } else if (this.coberturaResponse[0].isDomicilio == true && this.coberturaResponse[0].isOcurre == false) {
          // console.log('2 opcion: ' + (this.coberturaResponse[0].isDomicilio == true) && (this.coberturaResponse[0].isOcurre == false));
          this.opcionUno = false;
          this.opcionDos = true;
        } else if (this.coberturaResponse[0].isDomicilio == false && this.coberturaResponse[0].isOcurre == true) {
          // console.log('3 opcion: ' + (this.coberturaResponse[0].isDomicilio == false) && (this.coberturaResponse[0].isOcurre == true));
          this.opcionUno = false;
          this.opcionTres = true;
        } else {
          // console.log('4 opcion: ' + (this.coberturaResponse[0].isDomicilio == false) && (this.coberturaResponse[0].isOcurre == false));
          this.opcionUno = false;
          this.opcionCuatro = true;
        }
      } else {
        this.opcionUno = false;
        this.opcionCuatro = true;
      }
    }, error => {
      this.opcionUno = false;
      this.opcionCuatro = true;
      this.errorBool = true;
      this.msg = error["error"];
      // console.log(error["error"]);
    })
  }

  valoresResetOpciones() {
    this.opcionUno = true;
    this.opcionDos = false;
    this.opcionTres = false;
    this.opcionCuatro = false;
  }

  asignarValoresLTL() {
    this.forma.get('peso').setValidators(Validators.required);
    this.forma.get('peso').setValue(1000);
    this.forma.get('peso').disable();
    this.forma.get('peso').updateValueAndValidity();
    this.forma.get('largo').setValidators(Validators.required);
    this.forma.get('largo').setValue(120);
    this.forma.get('largo').disable();
    this.forma.get('largo').updateValueAndValidity();
    this.forma.get('ancho').setValidators(Validators.required);
    this.forma.get('ancho').setValue(105);
    this.forma.get('ancho').disable();
    this.forma.get('ancho').updateValueAndValidity();
    this.forma.get('alto').setValidators(Validators.required);
    this.forma.get('alto').setValue(190);
    this.forma.get('alto').disable();
    this.forma.get('alto').updateValueAndValidity();
  }

  verFormulario() {
    console.log(this.forma);
  }

}
