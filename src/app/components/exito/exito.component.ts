import { PaqueteService } from 'src/app/services/cotizacion/paquete.service';
import { DocumentacionService } from './../../services/documentacion/documentacion.service';
import { DocumentacionDto } from './../../models/dto/documentacionDto.model';
import { CotizacionDto } from './../../models/dto/cotizacionDto.model';
import { LegendaType } from './../../enums/legendas.enum';
import { EnvioService } from './../../services/envio/envio.service';
import { CostoDto } from './../../models/dto/costoDto.model';
import { CotizacionService } from './../../services/cotizacion/cotizacion.service';
import { ClienteDto } from './../../models/dto/clienteDto.model';
import { ClienteService } from './../../services/clientes/cliente.service';
import { Component, OnInit } from '@angular/core';
import { OpcionesDto } from 'src/app/models/dto/opcionesDto.model';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { DomicilioDto } from 'src/app/models/dto/domicilioDto.model';
import { DestinoDto } from 'src/app/models/dto/destinoDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.css']
})
export class ExitoComponent implements OnInit {

  clienteDto: ClienteDto = new ClienteDto(null, null, null, null, null);
  costo: CostoDto = new CostoDto(null, '','','',null,null,null,null,null,null,null,null,null,null,null,null, null, null, null);
  guia: string = '';

  // Legendas
  legenda: string = LegendaType.DatosPedido;
  legendaOrigen: string = LegendaType.Origen;
  legendaDestino: string = LegendaType.Destino;
  legendaPaquete: string = LegendaType.Paquete;
  legendaOpciones: string = LegendaType.Opciones;

  // Tipo Servicio
  tipoServicio: string = '';

  // Path
  path: string = '';

  cotizacionDto: CotizacionDto = new CotizacionDto(0,'',new OpcionesDto('','','','',''),new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','',new Date()),new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','',new Date()),[], new Date(),[],new CostoDto(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null));
  documentacionDto: DocumentacionDto = new DocumentacionDto(null,'',new OpcionesDto('','','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], []);

  constructor(
    private clienteService: ClienteService,
    private documentacionService: DocumentacionService,
    private cotizacionService: CotizacionService,
    private envioService: EnvioService,
    private paqueteService: PaqueteService
  ) { }

  ngOnInit(): void {
    this.recuperarDatosClienteService();
    this.guia = this.envioService.getGuia();
    this.cotizacionDto = this.documentacionService.getCotizacionDto();
    this.documentacionDto = this.documentacionService.getDocumentacion();
    this.tipoServicio = this.paqueteService.getTipoServicio();
  }

  recuperarDatosClienteService() {
    this.clienteDto = new ClienteDto(null, this.clienteService.getNombre(), this.clienteService.getCorreo(), this.clienteService.getTelCasa(), null);
  }



}
