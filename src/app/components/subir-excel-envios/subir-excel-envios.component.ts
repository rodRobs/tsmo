import { ArchivoService } from './../../services/archivo/archivo/archivo.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subir-excel-envios',
  templateUrl: './subir-excel-envios.component.html',
  styleUrls: ['./subir-excel-envios.component.css']
})
export class SubirExcelEnviosComponent implements OnInit {

  public pedidoFile: any = File;

  constructor(
    private archivoService: ArchivoService
  ) { }

  ngOnInit(): void {
  }

  onGuardar() {
    const formData = new FormData();
    formData.append('pedidos', this.pedidoFile);

    this.archivoService.guardarArchivo(formData)
    .subscribe(response => {
      console.log(response);
    })
  }

  onArhivoSeleccionado(event) {
    // console.log(event);
    let id;
    var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if (es_chrome) {
      id = event.currentTarget.id;
    } else {
      id = event.explicitOriginalTarget.id;
    }
    const file = event.target.files[0];
    this.pedidoFile = file;
    // console.log(file);
  }

}
