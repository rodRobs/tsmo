import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClienteDto } from 'src/app/models/dto/clienteDto.model';
import { DireccionDto } from 'src/app/models/dto/direccionDto.model';

@Component({
  selector: 'app-alta-clientes',
  templateUrl: './alta-clientes.component.html',
  styleUrls: ['./alta-clientes.component.css']
})
export class AltaClientesComponent implements OnInit {

  cliente: ClienteDto = new ClienteDto(0,'','','', null);

  colonias: string[] = [];

  constructor(

  ) { }

  ngOnInit(): void {
  }


  onSiguiente(form: NgForm) {

  }

}
