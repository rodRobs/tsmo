import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COTIZACION } from 'src/app/enums/cotizacion.enum';
import { Vista } from 'src/app/enums/vista.enum';
import { CargaDto } from 'src/app/models/dto/cargaDto.model';
import { DireccionDto } from 'src/app/models/dto/direccionDto.model';
import { CargaService } from 'src/app/services/cotizacion/carga.service';
import { DestinoService } from 'src/app/services/cotizacion/destino.service';
import { OrigenService } from 'src/app/services/cotizacion/origen.service';
import { PaqueteService } from 'src/app/services/cotizacion/paquete.service';

@Component({
  selector: 'app-costos-clientes',
  templateUrl: './costos-clientes.component.html',
  styleUrls: ['./costos-clientes.component.css']
})
export class CostosClientesComponent implements OnInit {

  carga: CargaDto = new CargaDto(0,0,0,0,0,0,0,0,0);
  origen: DireccionDto = new DireccionDto('','','','','','','','');
  destino: DireccionDto = new DireccionDto('','','','','','','','');
  peso: string = '';

  constructor(
    private cargaService: CargaService,
    private origenService: OrigenService,
    private destinoService: DestinoService,
    private paqueteService: PaqueteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.carga = new CargaDto(+this.cargaService.getId(), +this.cargaService.getCarga(), +this.cargaService.getFlete(), +this.cargaService.getRecoleccion(), +this.cargaService.getDomicilio(), +this.cargaService.getCxc(), +this.cargaService.getPrecio(), +this.cargaService.getUtilidad(), +this.cargaService.getPeso());
    this.origen = new DireccionDto(this.origenService.getCPOrigen(), this.origenService.getColoniaOrigen(), this.origenService.getCalleOrigen(), this.origenService.getNumeroExtOrigen(), this.origenService.getNumeroIntOrigen(), this.origenService.getCiudad(), this.origenService.getEstadoOrigen(),'');
    this.destino = new DireccionDto(this.destinoService.getCPDestino(), this.destinoService.getColoniaDestino(), this.destinoService.getCalleDestino(), this.destinoService.getNumeroExtDestino(), this.destinoService.getNumeroIntDestino(), this.destinoService.getCiudadDestino(), this.destinoService.getEstadoDestino(), this.destinoService.getReferenciaDestino());
    this.peso = this.paqueteService.getPeso();
  }

}
