import { Vista } from 'src/app/enums/vista.enum';
import { ProveedoresService } from './../../../services/proveedores.service';
import { ProveedorDto } from './../../../models/dto/proveedor.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent implements OnInit {

  proveedores: ProveedorDto[] = [];

  constructor(
    private proveedorService: ProveedoresService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarProveedores();
    this.proveedores.push(new ProveedorDto(1, 'Ro bless digital', '2022-03-23', 'ROOR910209MD4', '443535364464', 'BBVA', '5556581111', 'ro_bless_digital@hotmail.com', 'Rodrigo Robles', 'Citli 403-D, Sta Isabel Tola', null, null))
  }

  buscarProveedores() {
    this.proveedorService.listar()
    .subscribe(proveedores => {
      console.log(proveedores);
      this.proveedores = proveedores;
    })
  }

  btnAgregar() {
    this.router.navigate([Vista.PROVEEDORES_ALTA]);
  }

  ver(id: number) {
    this.router.navigate([Vista.PROVEEDORES_VER]);
  }

  altaCosto(id: number) {
    localStorage.setItem('proveedor', id.toString());
    this.router.navigate([Vista.COSTO_ALTA]);
  }

}
