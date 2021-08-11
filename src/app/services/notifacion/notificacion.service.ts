import { UsuarioNuevoModel } from './../../models/nuevoUsuario.model';
import { HttpClient } from '@angular/common/http';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { Injectable } from '@angular/core';
import { HostType } from 'src/app/enums/host.enum';

// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
const URL = 'http://localhost:8080/';
const NOTIFICACION = 'notificacion/';
const ENVIO = 'envio';
const ALTA_TSMO = 'alta/tsmo';
const FORMATO = 'envio/formato/';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(
    private http: HttpClient
  ) { }

  enviarCorreoDeEnvio(envio: EnvioDto) {
    // console.log(`${URL}${NOTIFICACION}${ENVIO}`);
    return this.http.post<string>(`${HostType.HOST}${NOTIFICACION}${ENVIO}`, envio);
  }

  enviarCorreoDeAltaUusarioTSMO(usuario: UsuarioNuevoModel) {
    return this.http.post<string>(`${HostType.HOST}${NOTIFICACION}${ALTA_TSMO}`, usuario);
  }

  enviarCorreoDeEnvioDocumento(id_envio: number) {
    // console.log(`${URL}${NOTIFICACION}${FORMATO}${id_envio}`);
    return this.http.get(`${HostType.HOST}${NOTIFICACION}${FORMATO}${id_envio}`);

  }
}
