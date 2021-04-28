import { ClienteService } from './../../../../services/clientes/cliente.service';
import { Vista } from './../../../../enums/vista.enum';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClienteDto } from './../../../../models/dto/clienteDto.model';
import { Component, OnInit } from '@angular/core';
import { DireccionDto } from 'src/app/models/dto/direccionDto.model';

const PATH = "/cliente";
@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent implements OnInit {



  cliente: ClienteDto = new ClienteDto(0,'','','');

  colonias: string[] = [];

  // False = alta-cliente [Rol = Personal TSMO], True =  alta desde cotización
  tramiteBool: boolean = false;

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    if(window.location.pathname == PATH)
      this.tramiteBool = true;
  }

  onAtras() {
    this.router.navigate([Vista.COSTOS_CLIENTE]);
  }

  onSiguiente(form: NgForm) {
    if (form.invalid) { return; }
    console.log('Entra en siguiente');
    this.guardarLocalStorage();
    if(this.tramiteBool) {
      this.router.navigate([Vista.PAGO_CLIENTE]);
    } else {
        console.log("Entra desde Usuario TSMO");
    }
  }

  guardarLocalStorage() {
    this.clienteService.setNombre(this.cliente.nombre);
    // this.clienteService.setApat(this.cliente.apat);
    // this.clienteService.setAmat(this.cliente.amat);
    this.clienteService.setCorreo(this.cliente.correo);
    this.clienteService.setTelCasa(this.cliente.telefono);
    // this.clienteService.setCelular(this.cliente.celular);
    // this.clienteService.setCP(this.cliente.direccion.cp);
    // this.clienteService.setColonia(this.cliente.direccion.colonia);
    // this.clienteService.setCalle(this.cliente.direccion.calle);
    // this.clienteService.setNumero(this.cliente.direccion.numeroExt);
    // this.clienteService.setMunicipio(this.cliente.direccion.delegacion);
    // this.clienteService.setEstado(this.cliente.direccion.estado);
  }


}
