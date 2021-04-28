import { EnvioDto } from './../../../../../models/dto/EnvioDto.model';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { Component, Input, OnInit } from '@angular/core';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';

@Component({
  selector: 'app-mostrar-informacion',
  templateUrl: './mostrar-informacion.component.html',
  styleUrls: ['./mostrar-informacion.component.css']
})
export class MostrarInformacionComponent implements OnInit {

  // Legenda
  legenda: string = LegendaType.Envio;
  origenLegenda: string = LegendaType.Origen;
  destinoLegenda: string = LegendaType.Destino;
  paqueteLegenda: string = LegendaType.Paquete;
  opcionesLegenda: string = LegendaType.Opciones;

  // Envio
  @Input() envio: EnvioMostrar;

  constructor() { }

  ngOnInit(): void {

  }

}
