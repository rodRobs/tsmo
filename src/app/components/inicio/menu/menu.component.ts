import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vista } from 'src/app/enums/vista.enum';
import { TokenService } from 'src/app/services/usuarios/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userName: string = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
  }

  onLogout() {
    this.tokenService.logOut();
    this.router.navigate([Vista.LOGIN]);
  }

}
