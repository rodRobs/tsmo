import { Vista } from 'src/app/enums/vista.enum';
import { Router } from '@angular/router';
import { TokenService } from './../../../services/usuarios/token.service';
import { SidebarService } from './../../../services/sidebar/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { RolesType } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(
    private sidebarService: SidebarService,
    private tokenService: TokenService,
    private router: Router
  ) {

    // this.menuItems = sidebarService.menuEmpleados;
    // console.log(this.menuItems);
    this.mostrarMenu(this.tokenService.getAuthorities());
  }

  ngOnInit(): void {
  }

  mostrarMenu(perfiles: string[]) {
    // this.menuItems = this.sidebarService.menuEmpleados;
    perfiles.forEach(perfil => {
      switch(perfil) {
        case RolesType.TSMO:
          this.menuItems = this.sidebarService.menuEmpleados;
          break;
        case RolesType.CLIENTE:
          this.menuItems = this.sidebarService.menuClientes;
          break;
        case RolesType.ADMIN:
          this.menuItems = this.sidebarService.menuAdministrador;
          break;
      }
    })
  }

  onLogout() {
    localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate([Vista.LOGIN]);
  }

}
