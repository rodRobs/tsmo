import { EnvioDto } from './../../../../models/dto/EnvioDto.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-estatus-envio',
  templateUrl: './alta-estatus-envio.component.html',
  styleUrls: ['./alta-estatus-envio.component.css']
})
export class AltaEstatusEnvioComponent implements OnInit {

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
