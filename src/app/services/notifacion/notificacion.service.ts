import { UsuarioNuevoModel } from './../../models/nuevoUsuario.model';
import { HttpClient } from '@angular/common/http';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { Injectable } from '@angular/core';

const URL = 'http://localhost:8080/';
const NOTIFICACION = 'notificacion/';
const ENVIO = 'envio';
const ALTA_TSMO = 'alta/tsmo'
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(
    private http: HttpClient
  ) { }

  enviarCorreoDeEnvio(envio: EnvioDto) {
    console.log(`${URL}${NOTIFICACION}${ENVIO}`);
    return this.http.post<string>(`${URL}${NOTIFICACION}${ENVIO}`, envio);
  }

  enviarCorreoDeAltaUusarioTSMO(usuario: UsuarioNuevoModel) {
    return this.http.post<string>(`${URL}${NOTIFICACION}${ALTA_TSMO}`, usuario);
  }
}
