import { PostActualizacionStatusType } from 'src/app/models/dto/actualizacionStatus.model';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RastreoDto } from 'src/app/models/dto/rastreo.model';

const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
// const URL = 'http://localhost:8080/';
const ACTUALIZAR = '/actualizar/';
const RASTREO = 'rastreo';
@Injectable({
  providedIn: 'root'
})
export class RastreoService {

  constructor(
    private http: HttpClient
  ) { }

  onRastrear(guia: string) {
    console.log(`${URL}${RASTREO}/${guia}`);
    return this.http.get<EnvioMostrar>(`${URL}${RASTREO}/${guia}`);
  }

  onRastrearCliente(guia: string, cliente: number) {
    console.log(`${URL}${RASTREO}/${guia}?cte=${cliente}`);
    return this.http.get<EnvioMostrar>(`${URL}${RASTREO}/${guia}?cte=${cliente}`);
  }

  onActualizarRastreo(envio: number, rastreo: RastreoDto) {
    return this.http.post<EnvioDto>(`${URL}${RASTREO}/${ACTUALIZAR}${envio}`, rastreo);
  }

  actualizarRastreoEtapas(rastreo: PostActualizacionStatusType) {
    return this.http.post<string>(`${URL}${RASTREO}/${ACTUALIZAR}${RASTREO}`, rastreo);
  }


}
