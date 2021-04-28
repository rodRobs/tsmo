import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Vista } from 'src/app/enums/vista.enum';
import { UsuarioLoginModel } from 'src/app/models/usuarioLogin.model';
import { LoginService } from 'src/app/services/usuarios/login.service';
import { TokenService } from 'src/app/services/usuarios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioLoginModel = new UsuarioLoginModel('', '');
  error: boolean = false;
  mensaje: string = '';

  usuarioEnvia: string = 'TSANMIGUEL';
  password: string = 'YyyE8e1#%e';

  constructor(  
    private loginService: LoginService, 
    private router: Router,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
   this.getToken();
   console.log(btoa(`${this.usuarioEnvia}:${this.password}`));
  }

  login(form: NgForm) {
    this.error = false;
    if (form.invalid) { return; }
    this.loginService.onLogin(this.usuario)
    .subscribe(data => {
      console.log(data);
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.router.navigate([Vista.INICIO]);
    }, error => {
      this.error = true;
      this.mensaje = error['error']['message'];
      // console.log(error);
    });
  }

  getToken() {
    if (this.tokenService.getToken()) {
      this.router.navigate([Vista.INICIO]);
    }
  }

}
