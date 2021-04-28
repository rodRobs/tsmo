import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { RastreoService } from './../../services/rastreo/rastreo.service';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.component.html',
  styleUrls: ['./rastreo.component.css']
})
export class RastreoComponent implements OnInit {

  // form
  forma: FormGroup;

  legend: string = LegendaType.Rastreo;

  loading: boolean = false;

  mostrarResultado: boolean = false;
  rastreosBoolean: boolean = false;

  guia: string = '';

  // Envio
  envio: EnvioDto = new EnvioDto(null,null,null,null,null,null,null,null);

  // Resultado
  error: string = '';
  errorBoolean: boolean = false;

  constructor(
    private rastrearService: RastreoService,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.forma = this.fb.group({
      guia: ['', Validators.required]
    })
  }

  get guiaNovalido() { return this.forma.get('guia').invalid && this.forma.get('guia').touched; }

  onRastrear() {
    this.loading = true;
    if (this.forma.invalid) {
      this.markTouch();
      this.loading = false;
      return;
    }
    this.rastrearService.onRastrear(this.forma.get('guia').value)
    .subscribe(envio => {
      this.rastreosBoolean = true;
      this.errorBoolean = false;
      console.log(envio);
      this.envio = envio;
    }, error => {
      console.log(error);
      this.rastreosBoolean = false;
      this.errorBoolean = true;
      this.error = error.error;
    })
  }

  markTouch() {
    if (this.forma.invalid) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  onFooter() {
    // document.getElementById('footer').style.bottom = 'unset';
  }

}
