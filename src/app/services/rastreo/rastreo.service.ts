import { ActualizacionEtapaDtoModel } from 'src/app/models/dto/actualizacionEtapaDto.model';
import { PostActualizacionStatusType } from 'src/app/models/dto/actualizacionStatus.model';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RastreoDto } from 'src/app/models/dto/rastreo.model';
import { HostType } from 'src/app/enums/host.enum';
import { ResponseActualizacionEtapaModel } from 'src/app/models/response/actualizacion-response.model';

// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
const URL = 'http://localhost:8080/';
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
    console.log(`${HostType.HOST}${RASTREO}/${guia}`);
    return this.http.get<EnvioMostrar>(`${HostType.HOST}${RASTREO}/${guia}`);
  }

  onRastrearCliente(guia: string, cliente: number) {
    console.log(`${HostType.HOST}${RASTREO}/${guia}?cte=${cliente}`);
    return this.http.get<EnvioMostrar>(`${HostType.HOST}${RASTREO}/${guia}?cte=${cliente}`);
  }

  onActualizarRastreo(envio: number, rastreo: RastreoDto) {
    return this.http.post<EnvioDto>(`${HostType.HOST}${RASTREO}${ACTUALIZAR}${envio}`, rastreo);
  }

  actualizarRastreoEtapas(rastreo: PostActualizacionStatusType) {
    return this.http.post<string>(`${HostType.HOST}${RASTREO}${ACTUALIZAR}${RASTREO}`, rastreo);
  }

  actualizarRastreo(actualizaEtapa: ActualizacionEtapaDtoModel) {
    return this.http.post<ResponseActualizacionEtapaModel>(`${HostType.HOST}${RASTREO}${ACTUALIZAR}etapa`, actualizaEtapa);
  }


}
