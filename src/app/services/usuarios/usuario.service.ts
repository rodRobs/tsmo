import { ClienteDto } from './../../models/dto/clienteDto.model';
import { UsuarioNuevoModel } from './../../models/nuevoUsuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
// const URL = 'http://localhost:8080/';
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
    return this.http.get<boolean>(`${URL}${CORREO}/${correo}`);
  }

  onBuscarNombreUsuario(nombreUsuario: string) {
    return this.http.get<boolean>(`${URL}${NOMBREUSUARIO}/${nombreUsuario}`);
  }

  onAltaUsuario(usuario: UsuarioNuevoModel) {
    console.log('AltaUsuario: ',usuario);
    return this.http.post<UsuarioNuevoModel>(`${URL}${NUEVO}`, usuario);
  }

  clientePorNombreUsuario(nombreUsuario: string) {
    return this.http.get<ClienteDto>(`${URL}${nombreUsuario}`);
  }
}


