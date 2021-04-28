import { Injectable } from '@angular/core';
import { UsuarioLoginModel } from 'src/app/models/usuarioLogin.model';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { JwtDTO } from 'src/app/models/dto/JwtDTO.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

const URLPATH = 'http://localhost:8080/auth/';
const LOGIN = 'login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  public onLogin(usuarioLogin: UsuarioLoginModel): Observable<JwtDTO>  {
    return this.http.post<JwtDTO>(`${URLPATH}${LOGIN}`, usuarioLogin);
  }

  public onLogout() { 
    return 
  }
}
