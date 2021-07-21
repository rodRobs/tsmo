import { CotizacionDto } from './../../models/dto/cotizacionDto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CargaDto } from 'src/app/models/dto/cargaDto.model';
import { TokenService } from '../usuarios/token.service';
import { CostoDto } from 'src/app/models/dto/costoDto.model';


const CP_D = 'cp_d';
const COLONIA_D = 'colonia_d';
const CALLE_D = 'calle_d';
const NUMERO_D = 'numero_d';
const DELEG_D = 'deleg_d';
const ESTADO_D = 'estado_d';
const COTIZACION = 'cotizacion'
const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
// const URL = 'http://localhost:8080/';
const CLIENTES = 'clientes';
const ENVIO = 'envio';
const ID = 'id';
const BUSCAR_COSTO = '/buscar/costos/';
@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  TOKEN: string =  this.tokenService.getToken();
  HEADERS = {
    headers: new HttpHeaders({
      authorization: `Bearer ${this.TOKEN}`
    })
  };

  onSolicitarCotizacion(cotizacion: any) {
    return this.http.post<CostoDto>(`${URL}${COTIZACION}`, cotizacion, this.HEADERS);
  }

  onSolicitarCotizacionClientes(cotizacion: CotizacionDto) {
    console.log(`${URL}${COTIZACION}/${CLIENTES}`);
    return this.http.post<CostoDto>(`${URL}${COTIZACION}/${CLIENTES}`, cotizacion);
  }

  onSolicitarCotizacionEnvio(cotizacion: CotizacionDto) {
    return this.http.post<CostoDto>(`${URL}${COTIZACION}/${ENVIO}`, cotizacion);
  }

  onSolicitarCosto(cotizacion: string) {
    return this.http.get<CostoDto>(`${URL}${COTIZACION}${BUSCAR_COSTO}${cotizacion}`);
  }

  setIdCotizacion(id: string) {
    localStorage.setItem(ID, id);
  }

  getIdCotizacion(): string {
    return localStorage.getItem(ID) || '';
  }

}
