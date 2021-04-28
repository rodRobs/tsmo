import { CostoDto } from './../../models/dto/costoDto.model';
import { CotizacionDto } from './../../models/dto/cotizacionDto.model';
import { CotizacionService } from './../../services/cotizacion/cotizacion.service';
import { PaqueteService } from 'src/app/services/cotizacion/paquete.service';
import { DocumentacionService } from './../../services/documentacion/documentacion.service';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { DocumentacionDto } from './../../models/dto/documentacionDto.model';
import { Component, OnInit } from '@angular/core';
import { OpcionesDto } from 'src/app/models/dto/opcionesDto.model';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { DomicilioDto } from 'src/app/models/dto/domicilioDto.model';
import { DestinoDto } from 'src/app/models/dto/destinoDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';

@Component({
  selector: 'app-datos-pedido',
  templateUrl: './datos-pedido.component.html',
  styleUrls: ['./datos-pedido.component.css']
})
export class DatosPedidoComponent implements OnInit {

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

  cotizacionDto: CotizacionDto = new CotizacionDto(0,'',new OpcionesDto('','','',''),new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','',new Date()),new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','',new Date()),[], new Date());
  documentacionDto: DocumentacionDto = new DocumentacionDto(null,'',new OpcionesDto('','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], new ServiciosDto('',''));
  costo: CostoDto = new CostoDto(null, '','','',null,null,null,null,null,null,null,null,null,null,null,null, null);


  constructor(
    private documentacionService: DocumentacionService,
    private cotizacionService: CotizacionService,
    private paqueteService: PaqueteService
  ) { }

  ngOnInit(): void {
    this.cotizacionDto = this.documentacionService.getCotizacionDto();
    this.documentacionDto = this.documentacionService.getDocumentacion();
    console.log(this.documentacionDto);
    console.log(this.cotizacionDto);
    this.path = window.location.pathname;
    this.tipoServicio = this.paqueteService.getTipoServicio();

  }

  onCotizar() {

  }

  onBuscarCosto() {
    this.cotizacionService.onSolicitarCosto(this.cotizacionService.getIdCotizacion())
    .subscribe(costo => {
      this.costo = costo;
    })
  }

  onConsultarGuia() {

  }

}
