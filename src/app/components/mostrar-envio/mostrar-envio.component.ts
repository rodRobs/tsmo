import { Router } from '@angular/router';
import { EnvioService } from './../../services/envio/envio.service';
import { EnvioMostrar } from './../../models/dto/envioMostrar.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-envio',
  templateUrl: './mostrar-envio.component.html',
  styleUrls: ['./mostrar-envio.component.css']
})
export class MostrarEnvioComponent implements OnInit {

  mostrarEnvioBoolean: boolean = false;
  envio: EnvioMostrar;
  guia: string;

  constructor(
    private envioService: EnvioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarEnvio(localStorage.getItem('envio'));

  }

  buscarEnvio(guia: string) {
    this.envioService.buscarEnvioPorGuia(guia)
    .subscribe(envio => {
      // console.log(envio);
      this.envio = envio;
      this.mostrarEnvioBoolean = true;
    })
  }

  onRegresar() {
    this.router.navigate(['dashboard/envios']);
  }
}
