import { Injectable } from '@angular/core';
import { UsuarioLoginModel } from 'src/app/models/usuarioLogin.model';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { JwtDTO } from 'src/app/models/dto/JwtDTO.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
// const URL = 'http://localhost:8080/';
const LOGIN = 'login';
const AUTH = 'auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  public onLogin(usuarioLogin: UsuarioLoginModel): Observable<JwtDTO>  {
    console.log(`${URL}${LOGIN}`);
    return this.http.post<JwtDTO>(`${URL}${AUTH}/${LOGIN}`, usuarioLogin);
  }

  public onLogout() {
    return;
  }
}
