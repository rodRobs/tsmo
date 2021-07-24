import { TokenService } from './../../../../../services/usuarios/token.service';
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

  //
  usuario: string = '';

  // Envio
  @Input() envio: EnvioMostrar;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.usuario = this.tokenService.getUserName();
    console.log(this.usuario);
    console.log(this.usuario === '');
  }

  googleMapsOrigen() {
    let url: string =`https://www.google.com.mx/maps/place/${this.envio.documentacion.cotizacion.origen.domicilio.calle}+${this.envio.documentacion.cotizacion.origen.domicilio.numeroExt},+${this.envio.documentacion.cotizacion.origen.domicilio.colonia},+${this.envio.documentacion.cotizacion.origen.domicilio.ciudad},+${this.envio.documentacion.cotizacion.origen.domicilio.codigoPostal}, ${this.envio.documentacion.cotizacion.origen.domicilio.estado}`
    window.open(url, "_blank");
  }

  googleMapsDestino() {
    let url: string =`https://www.google.com.mx/maps/place/${this.envio.documentacion.cotizacion.destino.domicilio.calle}+${this.envio.documentacion.cotizacion.destino.domicilio.numeroExt},+${this.envio.documentacion.cotizacion.destino.domicilio.colonia},+${this.envio.documentacion.cotizacion.destino.domicilio.ciudad},+${this.envio.documentacion.cotizacion.destino.domicilio.codigoPostal}, ${this.envio.documentacion.cotizacion.destino.domicilio.estado}`
    window.open(url, "_blank");
  }

}
