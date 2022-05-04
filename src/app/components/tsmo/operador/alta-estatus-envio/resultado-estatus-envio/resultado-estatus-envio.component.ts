import { Component, OnInit, Input } from '@angular/core';
import { ResponseActualizacionEtapaModel } from 'src/app/models/response/actualizacion-response.model';

@Component({
  selector: 'app-resultado-estatus-envio',
  templateUrl: './resultado-estatus-envio.component.html',
  styleUrls: ['./resultado-estatus-envio.component.css']
})
export class ResultadoEstatusEnvioComponent implements OnInit {

  @Input () rastreoResponse: ResponseActualizacionEtapaModel;

  constructor() { }

  ngOnInit(): void {
  }



}
