import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RastreoDto } from 'src/app/models/dto/rastreo.model';

const URL = 'http://localhost:8080/rastreo';
const ACTUALIZAR = '/actualizar/';
@Injectable({
  providedIn: 'root'
})
export class RastreoService {

  constructor(
    private http: HttpClient
  ) { }

  onRastrear(guia: string) {
    return this.http.get<EnvioDto>(`${URL}/${guia}`);
  }

  onActualizarRastreo(envio: number, rastreo: RastreoDto) {
    return this.http.post<EnvioDto>(`${URL}${ACTUALIZAR}${envio}`, rastreo);
  }

}
