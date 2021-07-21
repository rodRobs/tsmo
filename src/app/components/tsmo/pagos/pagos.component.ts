import { EnvioDto } from './../../../models/dto/EnvioDto.model';
import { RastreoDto } from './../../../models/dto/rastreo.model';
import { LegendaType } from './../../../enums/legendas.enum';
import { EnvioMostrar } from './../../../models/dto/envioMostrar.model';
import { RastreoService } from './../../../services/rastreo/rastreo.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  envio: EnvioDto;

  mostrar: boolean = false;
  botonerBoolean: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  buscarEnvio(envio: EnvioDto) {
    if (envio) {
      this.envio = envio;
      this.botonerBoolean = true;
      this.mostrar = true;
    } else {
      this.envio = null;
      this.botonerBoolean = false;
      this.mostrar = false;
      document.getElementById('footer').style.position = 'absolute';
    }
  }

  onMostrarInformacion() {
    this.mostrar = !this.mostrar;
    if (this.mostrar) {
      document.getElementById('footer').style.position = 'relative';
    } else {
      document.getElementById('footer').style.position = 'absolute';
    }
  }

}
