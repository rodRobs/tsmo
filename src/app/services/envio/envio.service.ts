import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { DocumentacionDto } from './../../models/dto/documentacionDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';

const URL = 'http://localhost:8080/';
const ENVIO = 'envios';
const DOCUMENTACION = 'documentacion';
const GUIA = 'guia';
const ACT_PAGO = '/actualizarPago/';
const ACT_ENV = '/actualizarEstadoEnvio/';
const BUSCAR_GUIA = 'buscar/';
@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  constructor(
    private http: HttpClient
  ) { }

  documentacion(documentacionDto: DocumentacionDto) {
    return this.http.post(URL, documentacionDto);
  }

  guardar(envio: EnvioDto, cliente: number, documentacion: number, proveedor: string, tipoPaquete) {
    return this.http.post<EnvioDto>(`${URL}${ENVIO}/${cliente}/${documentacion}/${proveedor}/${tipoPaquete}`, envio);
  }

  getGuia(): string {
    return localStorage.getItem(GUIA) || '';
  }

  setGuia(guia: string) {
    localStorage.setItem(GUIA, guia);
  }

  actualizarEstado(estadoEnvio: string, envio: EnvioDto) {
    return this.http.post<EnvioDto>(`${URL}${ENVIO}${ACT_ENV}${estadoEnvio}`, envio);
  }

  actualizarEstadoPago(estadoPago: string, envio: EnvioDto) {
    console.log('Desde servicio Envio: ', envio);
    return this.http.post<EnvioDto>(`${URL}${ENVIO}${ACT_PAGO}${estadoPago}`, envio);
  }

  buscarEnvioPorGuia(guia: string) {
    return this.http.get<EnvioMostrar>(`${URL}${ENVIO}/${BUSCAR_GUIA}${guia}`);
  }

}
