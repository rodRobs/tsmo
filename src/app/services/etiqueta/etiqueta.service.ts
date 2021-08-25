import { HostType } from 'src/app/enums/host.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ETIQUETA = 'etiquetas/';
const IMPRIMIR = 'imprimir/';
@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  // Servicio para etiquetas de proveedores

  constructor(
    private http: HttpClient
  ) { }

  imprimirGuiaProveedor(guia: string) {
    return this.http.get(`${HostType.HOST}${ETIQUETA}${IMPRIMIR}${guia}`, {responseType: 'arraybuffer'});
  }
}
