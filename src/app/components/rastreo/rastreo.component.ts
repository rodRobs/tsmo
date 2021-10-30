import { RastreoDto } from './../../models/dto/rastreo.model';
import { ClienteDto } from './../../models/dto/clienteDto.model';
import { UsuarioService } from './../../services/usuarios/usuario.service';
import { PerfilType } from './../../enums/perfil.enum';
import { TokenService } from './../../services/usuarios/token.service';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { RastreoService } from './../../services/rastreo/rastreo.service';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const GUIA: string = 'guia';
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

  // perfil
  perfil: number;

  // cliente
  cliente: ClienteDto;

  // Envio
  // envio: EnvioDto = new EnvioDto(null,null,null,null,null,null,null,null, null);
  envio: EnvioMostrar;
  rastreos: RastreoDto[];

  // Resultado
  error: string = '';
  errorBoolean: boolean = false;

  constructor(
    private rastrearService: RastreoService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.seleccionPerfil();
    this.verificarParamURL();
    // document.getElementById('footer').style.position = 'absolute';
  }

  crearFormulario() {
    this.forma = this.fb.group({
      guia: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]
    })
  }

  get guiaNovalido() { return this.forma.get('guia').invalid && this.forma.get('guia').touched; }

  onRastrear() {
    console.log(`perfil: ${this.perfil}`);
    this.envio = null;
    this.loading = true;
    if (this.forma.invalid) {
      this.markTouch();
      this.loading = false;
      return;
    }
    if (this.perfil == PerfilType.CLIENTE) {
      this.rastreoCLiente();
    } else {
    // } else if (this.perfil == PerfilType.TSMO) {
      this.rastreo();
    }
  }

  rastreo() {
    console.log('Rastreo normal');
    this.rastrearService.onRastrear(this.forma.get('guia').value)
    .subscribe(rastreos => {
      document.getElementById('footer').style.position = 'relative';
      this.rastreosBoolean = true;
      this.errorBoolean = false;
      console.log('envio: ',rastreos);
      this.rastreos = rastreos;
    }, error => {
      document.getElementById('footer').style.position = 'relative';
      // console.log(error);
      this.rastreosBoolean = false;
      this.errorBoolean = true;
      this.error = error.error;
    })
  }

  rastreoCLiente() {
    // console.log('Rastreo cliente');
    this.rastrearService.onRastrearCliente(this.forma.get('guia').value, this.cliente.id)
    .subscribe(envio => {
      this.rastreosBoolean = true;
      this.errorBoolean = false;
      console.log('envio: ',envio);
      this.envio = envio;
    }, error => {
      // console.log(error);
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

  seleccionPerfil() {
    // console.log(this.tokenService.getAuthorities());
    this.tokenService.getAuthorities().forEach(authoritie => {
      switch(authoritie) {
        case 'ROL_TSMO':
          this.perfil = PerfilType.TSMO;
          break
        case 'ROL_CLIENTE':
          this.perfil = PerfilType.CLIENTE;
          this.buscarClienteBD();
          break;
      }
    })
  }

  buscarClienteBD() {
    this.usuarioService.clientePorNombreUsuario(this.tokenService.getUserName())
    .subscribe(cliente => {
      // console.log(cliente);
      this.cliente = cliente;
    })
  }

  verificarParamURL() {
    // let guia: string = '';
    this.forma.get('guia').setValue(this.getParamGuia(GUIA));
    if (this.forma.get('guia').value != '') {
      this.onRastrear()
    }
  }

  getParamGuia(guia: string): string {
    guia = guia.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + guia + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

}
