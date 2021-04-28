import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vista } from 'src/app/enums/vista.enum';
import { TokenService } from 'src/app/services/usuarios/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.tokenService.getToken())
      this.router.navigate([Vista.LOGIN]);
  }

}
