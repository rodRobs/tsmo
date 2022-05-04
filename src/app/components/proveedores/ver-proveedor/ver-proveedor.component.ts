import { Vista } from 'src/app/enums/vista.enum';
import { Router } from '@angular/router';
import { ProveedorDto } from 'src/app/models/dto/proveedor.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-proveedor',
  templateUrl: './ver-proveedor.component.html',
  styleUrls: ['./ver-proveedor.component.css']
})
export class VerProveedorComponent implements OnInit {

  proveedor: ProveedorDto;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.proveedor = new ProveedorDto(1, 'Ro bless digital', '2022-03-23', 'ROOR910209MD4', '443535364464', 'BBVA', '5556581111', 'ro_bless_digital@hotmail.com', 'Rodrigo Robles', 'Citli 403-D, Sta Isabel Tola', null, null);
  }

  onRegresar() {
    this.router.navigate([Vista.PROVEEDORES_LISTA]);
  }

}
