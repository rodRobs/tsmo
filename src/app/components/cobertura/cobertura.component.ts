import { Vista } from 'src/app/enums/vista.enum';
import { SwitchType } from 'src/app/enums/switch.enum';
import { Router } from '@angular/router';
import { DestinoService } from './../../services/cotizacion/destino.service';
import { OrigenService } from './../../services/cotizacion/origen.service';
import { InstruccionesType } from './../../enums/instrucciones.enum';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { CoberturaService } from './../../services/cobertura/cobertura.service';
import { CoberturaDto } from './../../models/dto/cobertura.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CoberturaResponseModel } from 'src/app/models/response/cobertura-response.model';
import { ParrafoType } from 'src/app/enums/parrafo.enum';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.css']
})
export class CoberturaComponent implements OnInit {

  legend: string = LegendaType.Cobertura;
  parrafo: string = ParrafoType.Cobertura;
  instrucciones: string = InstruccionesType.Cobertura;

  forma: FormGroup;
  coberturaDto: CoberturaDto = new CoberturaDto('','');
  // coberturaResponse: CoberturaResponseModel = new CoberturaResponseModel('',false, false, '','');
  coberturaResponse: CoberturaResponseModel[] = [];

  loading: boolean = false;
  resultado: boolean = false;

  sinServicio: boolean = false;

  errorBool: boolean = false;
  msgError: string;

  constructor(
    private fb: FormBuilder,
    private coberturaService: CoberturaService,
    private origenService: OrigenService,
    private destinoService: DestinoService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarValoresService();
    // console.log(window.location.pathname);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required]
    })
  }

  get origenNoValido() { return this.forma.get('origen').invalid && this.forma.get('origen').touched; }
  get destinoNoValido() { return this.forma.get('destino').invalid && this.forma.get('destino').touched; }

  allTouched() {
    if (this.forma.invalid) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  onCobertura() {
    localStorage.clear();
    this.resultado = false;
    this.loading = true;
    this.errorBool = true;
    if ( this.forma.invalid ) {
      this.allTouched();
      this.loading = false;
      return;
    }
    this.guardarValoresService();
    this.crearCoberturaDto();
    this.coberturaService.cobertura(this.coberturaDto)
    .subscribe(response => {

      this.coberturaResponse = response;
      // console.log(response);
      // console.log(response.length == 0);
      // console.log(typeof response[0] === undefined || response[0] == undefined);
      this.sinServicio = false;
      if (response[0] != undefined) {
        this.sinServicio = response[0].isDomicilio || response[0].isOcurre;
      }

      // this.coberturaResponse = new CoberturaResponseModel(response.clave, response.domicilio, response.ocurre, response.tipoServicio, response.zona)
      this.loading = false;
      this.resultado = true;
      // console.log('Response:' ,response);
      // console.log('CoberturaRes: ',this.coberturaResponse);
      // console.log(this.coberturaResponse[0].clave);
      // console.log(this.coberturaResponse[0].domicilio);
      // console.log(this.coberturaResponse[0].ocurre);
    }, error => {
      this.errorBool = true;
      this.loading = false;
      this.msgError = error['error'];
      // console.log(error['error']);
      //window.alert('No se puso checar la cobertura de los datos de origen y destino ingresados');
    })
  }

  crearCoberturaDto () {
    this.coberturaDto.cpOrigen = this.forma.get('origen').value;
    this.coberturaDto.cpDestino = this.forma.get('destino').value;
  }

  guardarValoresService() {
    this.origenService.setCPOrigen(this.forma.get('origen').value);
    this.destinoService.setCPDestino(this.forma.get('destino').value);
  }

  cargarValoresService() {
    this.forma.get('origen').setValue(this.origenService.getCPOrigen());
    this.forma.get('destino').setValue(this.destinoService.getCPDestino());
  }

  onRouter() {
    switch(window.location.pathname) {
      case SwitchType.COBERTURA:
        this.router.navigate([Vista.COTIZACION]);
        break;
      case SwitchType.COBERTURA_DASHBOARD:
        // console.log('Dashboard');
        this.router.navigate([Vista.COTIZACION_DASHBOARD]);
        break;
    }
  }

}
