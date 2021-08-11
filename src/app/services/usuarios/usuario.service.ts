import { ClienteDto } from './../../models/dto/clienteDto.model';
import { UsuarioNuevoModel } from './../../models/nuevoUsuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostType } from 'src/app/enums/host.enum';

// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
const URL = 'http://localhost:8080/';
const AUTH = 'auth/'
const CORREO = 'correo';
const NOMBREUSUARIO = 'nombreUsuario';
const NUEVO = 'nuevo';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  onBuscarCorreo(correo: string) {
    return this.http.get<boolean>(`${HostType.HOST}${AUTH}${CORREO}/${correo}`);
  }

  onBuscarNombreUsuario(nombreUsuario: string) {
    return this.http.get<boolean>(`${HostType.HOST}${AUTH}${NOMBREUSUARIO}/${nombreUsuario}`);
  }

  onAltaUsuario(usuario: UsuarioNuevoModel) {
    console.log('AltaUsuario: ',usuario);
    return this.http.post<UsuarioNuevoModel>(`${HostType.HOST}${AUTH}${NUEVO}`, usuario);
  }

  clientePorNombreUsuario(nombreUsuario: string) {
    return this.http.get<ClienteDto>(`${HostType.HOST}${AUTH}${nombreUsuario}`);
  }
}


