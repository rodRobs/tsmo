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

const URL_CP = 'https://api-sepomex.hckdrk.mx/query/info_cp/';
@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  legenda: string = LegendaType.Cotizacion;
  legendaCosto: string = LegendaType.CostoCotizacion;
  parrafo: string = ParrafoType.Cotizar;
  instrucciones: string = InstruccionesType.Cotizacion;

  cotizacion: CotizacionDto = new CotizacionDto(0,'',new OpcionesDto('','','',''),new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','',new Date()),new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','',new Date()),[], new Date());
  detalle: DetalleDto = new DetalleDto('','','',new DimensionesDto(null,null,null,null));

  forma: FormGroup;

  loading:boolean = false;
  paquete: boolean = false;

  mostrarPrecio: boolean = false;
  precio: number = 0;
  servicio: string = '';

  constructor(
    private fb: FormBuilder,
    private origenService: OrigenService,
    private destinoService: DestinoService,
    private paqueteService: PaqueteService,
    private cpService: CpService,
    private cotizacionService: CotizacionService,
    private precioService: PrecioService
  ) {
    this.crearFormulario();
    this.cargarValoresService();
    this.existeCPOrigen();
    this.existeCPDestino();
  }

  ngOnInit(): void {

  }

  crearFormulario() {
    this.forma = this.fb.group({
      origen: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      destino: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      tipoEntrega: ['', Validators.required],
      tipoEnvio: ['', Validators.required],
      valor: ['', Validators.required],
      largo: ['', Validators.required],
      alto: ['', Validators.required],
      ancho: ['', Validators.required],
      peso: ['', Validators.required]
    });
  }

  get origenNoValido() { return this.forma.get('origen').invalid && this.forma.get('origen').touched; }
  get destinoNoValido() { return this.forma.get('destino').invalid && this.forma.get('destino').touched; }
  get tipoEntregaNoValido() { return this.forma.get('tipoEntrega').invalid && this.forma.get('tipoEntrega').touched; }
  get tipoEnvioNoValido() { return this.forma.get('tipoEnvio').invalid && this.forma.get('tipoEnvio').touched; }
  get valorNoValido() { return this.forma.get('valor').invalid && this.forma.get('valor').touched; }
  get largoNoValido() { return this.forma.get('largo').invalid && this.forma.get('largo').touched; }
  get altoNoValido() { return this.forma.get('alto').invalid && this.forma.get('alto').touched; }
  get anchoNoValido() { return this.forma.get('ancho').invalid && this.forma.get('ancho').touched; }
  get pesoNoValido() { return this.forma.get('peso').invalid && this.forma.get('peso').touched; }

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

  onCotizar() {
    localStorage.clear();
    this.loading = true;
    // console.log("Entra a boton cotizar");
    // console.log(this.forma);
    if ( this.forma.invalid ) {
      console.log('Invalido');
      this.allTouched();
      this.loading = false;
      return;
    }
    this.guardarValoresEnServicios();
    this.asignarACotizacion();
    // console.log(this.cotizacion);
    this.cotizacionService.onSolicitarCotizacionClientes(this.cotizacion)
    .subscribe(costo => {
      this.loading = false;
      this.mostrarPrecio = true;
      this.precioService.setCosto(costo.costoTotal.toString());
      this.precio = costo.costoTotal;
      this.servicio = costo.tipoServicio;
      console.log(costo);
    }, error => {
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
    // this.paqueteService.
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
  }

  onBuscarCPOrigen() {
    if(this.forma.get('origen').value.length < 5) { return; }
    this.cpService.consultarCP(this.forma.get('origen').value)
    .subscribe(response => {
      console.log(response);
      this.cotizacion.origen.domicilio.ciudad = response['response'].ciudad;
      this.cotizacion.origen.domicilio.estado = response['response'].estado;
      this.cotizacion.origen.domicilio.pais = response['response'].pais;
      // this.cotizacion.origen.domicilio. = response['response'].municipio;
      this.cotizacion.origen.domicilio.codigoPostal = this.forma.get('origen').value;
    })
  }

  onBuscarCPDestino() {
    if(this.forma.get('destino').value.length < 5) { return; }
    this.cpService.consultarCP(this.forma.get('destino').value)
    .subscribe(response => {
      console.log(response);
      this.cotizacion.destino.domicilio.ciudad = response['response'].ciudad;
      this.cotizacion.destino.domicilio.estado = response['response'].estado;
      this.cotizacion.destino.domicilio.pais = response['response'].pais;
      // this.cotizacion.delegacionDestino = response['response'].municipio;
      this.cotizacion.destino.domicilio.codigoPostal = this.forma.get('destino').value;
    })
  }

  asignarACotizacion() {
    this.cotizacion.detalle = [];
    this.cotizacion.origen.domicilio.codigoPostal = this.forma.get('origen').value;
    this.cotizacion.destino.domicilio.codigoPostal = this.forma.get('destino').value;
    this.cotizacion.opciones.tipoEnvio = this.forma.get('tipoEnvio').value;
    this.cotizacion.opciones.tipoEntrega = this.forma.get('tipoEntrega').value;
    this.detalle.dimensiones.largo = this.forma.get('largo').value;
    this.detalle.dimensiones.ancho = this.forma.get('ancho').value;
    this.detalle.dimensiones.alto = this.forma.get('alto').value;
    this.detalle.dimensiones.peso = this.forma.get('peso').value;
    this.detalle.valorDeclarado = this.forma.get('valor').value;
    this.cotizacion.detalle.push(this.detalle);
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

}