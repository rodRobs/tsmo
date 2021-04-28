import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vista } from 'src/app/enums/vista.enum';
import { CargaDto } from 'src/app/models/dto/cargaDto.model';
import { DireccionDto } from 'src/app/models/dto/direccionDto.model';
import { CargaService } from 'src/app/services/cotizacion/carga.service';
import { DestinoService } from 'src/app/services/cotizacion/destino.service';
import { OrigenService } from 'src/app/services/cotizacion/origen.service';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styleUrls: ['./costos.component.css']
})
export class CostosComponent implements OnInit {

  carga: CargaDto = new CargaDto(0,0,0,0,0,0,0,0,0);
  origen: DireccionDto = new DireccionDto('','','','','','','','');
  destino: DireccionDto = new DireccionDto('','','','','','','','');

  constructor(
    private cargaService: CargaService,
    private origenService: OrigenService,
    private destinoService: DestinoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.carga = new CargaDto(+this.cargaService.getId(), +this.cargaService.getCarga(), +this.cargaService.getFlete(), +this.cargaService.getRecoleccion(), +this.cargaService.getDomicilio(), +this.cargaService.getCxc(), +this.cargaService.getPrecio(), +this.cargaService.getUtilidad(), +this.cargaService.getPeso());
    this.origen = new DireccionDto(this.origenService.getCPOrigen(), this.origenService.getColoniaOrigen(), this.origenService.getCalleOrigen(), this.origenService.getNumeroExtOrigen(), this.origenService.getNumeroIntOrigen(), this.origenService.getCiudad(), this.origenService.getEstadoOrigen(),'');
    this.destino = new DireccionDto(this.destinoService.getCPDestino(), this.destinoService.getColoniaDestino(), this.destinoService.getCalleDestino(), this.destinoService.getNumeroExtDestino(), this.destinoService.getNumeroIntDestino(), this.destinoService.getCiudadDestino(), this.destinoService.getEstadoDestino(), this.destinoService.getReferenciaDestino());
  }

  onNuevaCotizacion() {
    localStorage.clear();
    this.router.navigate([Vista.ORIGEN]);
  }

}
