import { ClienteService } from './../../services/clientes/cliente.service';
import { ClienteDto } from './../../models/dto/clienteDto.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  clienteDto: ClienteDto = new ClienteDto(null, null, null, null, null);

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.recuperarDatosClienteService();
  }

  recuperarDatosClienteService() {
    this.clienteDto = new ClienteDto(null, this.clienteService.getNombre(), this.clienteService.getCorreo(), this.clienteService.getTelCasa(), null);
  }

}
