import { EnvioDto } from './../../../models/dto/EnvioDto.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tablas-envios',
  templateUrl: './tablas-envios.component.html',
  styleUrls: ['./tablas-envios.component.css']
})
export class TablasEnviosComponent implements OnInit {

  @Input() envios: EnvioDto[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.envios);
  }

}
