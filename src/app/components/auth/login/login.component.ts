import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesType } from 'src/app/enums/roles.enum';
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

  usuario: UsuarioLoginModel = new UsuarioLoginModel('','');
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
    // console.log('object');
    // console.log(window.btoa('$2a$10$yzf7gaqvxiJXhxFbjmUm3.jWow/WgPPtouiA/NkcIMFVzZV5iQ7ie'));
    this.getToken();
    //  console.log(btoa(`${this.usuarioEnvia}:${this.password}`));
    document.getElementById('header-principal').style.display = 'block';
    document.getElementById('menu').style.zIndex = '1';
    document
  }

  login(form: NgForm) {
    this.error = false;
    if (form.invalid) { return; }
    this.loginService.onLogin(this.usuario)
    .subscribe(data => {
      // console.log(data);
      localStorage.clear();
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.vistas(this.tokenService.getAuthorities());
      // this.router.navigate([Vista.INICIO]);
    }, error => {
      this.error = true;
      this.mensaje = error['error']['message'];
      // console.log(error);
    });
  }

  getToken() {
    // console.log(this.tokenService.getToken());
    // console.log(localStorage);
    if (this.tokenService.getToken()) {
      this.vistas(this.tokenService.getAuthorities());
    }
  }

  // ddk
  vistas(perfiles: string[]) {
    console.log(perfiles);
    perfiles.forEach(perfil => {
      // console.log('Admin: ',perfil==RolesType.ROLE_ADMIN.toString());
      // console.log(RolesType.ROLE_ADMIN.toString());
      switch(perfil) {
        case RolesType.ADMIN:
          this.router.navigate([Vista.INICIO_DASHBOARD]);
          break;
        case RolesType.TSMO:
          // Personal TSMO
          this.router.navigate([Vista.INICIO_DASHBOARD]);
          break;
        case RolesType.CLIENTE:
          // Cliente TSMO
          this.router.navigate([Vista.INICIO_DASHBOARD]);
          break;
        // case '':
        //   //
        //   break;
      }
    });
  }

}
