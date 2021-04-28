import { UsuarioNuevoModel } from './../../models/nuevoUsuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://localhost:8080/auth/';
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
}
