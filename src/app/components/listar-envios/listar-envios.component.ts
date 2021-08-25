import { EtiquetaService } from './../../services/etiqueta/etiqueta.service';
import { UsuarioService } from './../../services/usuarios/usuario.service';
import { PerfilType } from './../../enums/perfil.enum';
import { TokenService } from './../../services/usuarios/token.service';
import { ClienteDto } from './../../models/dto/clienteDto.model';
import { ClienteService } from './../../services/clientes/cliente.service';
import { Router } from '@angular/router';
import { EnvioMostrar } from './../../models/dto/envioMostrar.model';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { EnvioService } from './../../services/envio/envio.service';
import { InstruccionesType } from './../../enums/instrucciones.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParrafoType } from './../../enums/parrafo.enum';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { Component, OnInit } from '@angular/core';
import { EstadosType } from 'src/app/models/forms/estados.enum';
import { StaticSymbol } from '@angular/compiler';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';

@Component({
  selector: 'app-listar-envios',
  templateUrl: './listar-envios.component.html',
  styleUrls: ['./listar-envios.component.css']
})
export class ListarEnviosComponent implements OnInit {

  // number
  p: number = 1;

  // Perfil
  perfil: number;

  legend: string = LegendaType.Envios;
  parrafo: string = ParrafoType.Envios;
  instrucciones: string = InstruccionesType.Envios;

  resultado: any;

  estados: string[] = [];
  clientes: ClienteDto[] = [];

  // Parametros
  params = new Map();

  // Formulario
  forma: FormGroup;

  // Mensajes
  mensajeBusquedaVaciaBoolean: boolean = false;
  mensajeBusquedaVacia: string = 'No se encontraron envíos con la búsqueda realizada';

  // Resultado
  envios: EnvioMostrar[] = [];

  // CLiente
  cliente: ClienteDto;

  // Ciuadades
  ciudades: string[] = [];

  // params
  paramsURL: string = '';

  // Pogress Bar
  pogressBoolean: boolean = false;

  constructor(
    private envioService: EnvioService,
    private fb: FormBuilder,
    private router: Router,
    private clientesService: ClienteService,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private domicilioService: DomicilioService,
    private etiquetaService: EtiquetaService
  ) {
    this.crearFormulario();
  }

  crearFormulario() {
    this.forma = this.fb.group({
      periodoBusqueda: [''],
      periodoInicial: [{value: '', disabled: true}, Validators.required],
      periodoFinal: [{value: '', disabled: true}, Validators.required],
      estadoEnvio: [''],
      estadoPago: [''],
      cliente: [''],
      proveedor: [''],
      origen: [''],
      destino: ['']
    })
    // this.forma.get('periodoInicial').disable();
    // this.forma.get('periodoFinal').disable();
  }

  ngOnInit(): void {
    this.estados = Object.values( EstadosType );
    this.validarStorage();
    this.listarClientes();
    this.seleccionPerfil();
    this.asignarCiudades();
    console.log(this.tokenService.roles);
    console.log(this.tokenService.roles.find(element => element == 'ROL_TSMO'));
    console.log(this.tokenService.roles.indexOf('ROL_TSMO') !== -1);
  }

  asignarCiudades() {
    this.domicilioService.listarCiudadesEnvios()
    .subscribe(ciudades => {
      this.ciudades = ciudades;
    })
  }

  onBuscar() {
    this.pogressBoolean = true; // Activar pogress bar
    this.envioService.buscarEnvioPorFiltros(this.armarParams())
    .subscribe(envios => {
      console.log(envios);
      this.envios = envios;
      console.log(this.envios == null);
      console.log(this.envios != null);
        this.guardarStorage();
        this.params = new Map();
        if (envios.length == 0) {
          this.mensajeBusquedaVaciaBoolean = true;
        } else {
          this.mensajeBusquedaVaciaBoolean = false;
          this.envios = envios;
        }
        this.pogressBoolean = false;
      }, error => {
        this.envios = [];
        this.mensajeBusquedaVaciaBoolean = true;
        this.pogressBoolean = false;
      })
  }

  onBuscarEnvio(guia: string) {
    // console.log(id);
    localStorage.setItem('envio', guia);
    this.guardarStorage();
    this.router.navigate(['dashboard/ver/envio']);
  }

  guardarStorage() {
    // console.log('Envios guardar', this.envios);
    // console.log('Stringify: ',JSON.stringify(this.envios));
    localStorage.setItem('envios', JSON.stringify(this.envios));
  }

  validarStorage() {
    this.envios = JSON.parse(localStorage.getItem('envios'));
    console.log(this.envios);
  }

  onActivarPeriodo() {
    if(this.forma.get('periodoBusqueda').value) {
      this.forma.get('periodoInicial').enable();
      this.forma.get('periodoFinal').enable();
    } else {
      this.forma.get('periodoInicial').disable();
      this.forma.get('periodoFinal').disable();
    }
  }

  listarClientes() {
    this.clientesService.buscarTodosClientes()
    .subscribe(clientes => {
      // console.log(clientes);
      this.clientes = clientes;
    })
  }

  seleccionPerfil() {
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
    console.log('BuscarCliente');
    this.usuarioService.clientePorNombreUsuario(this.tokenService.getUserName())
    .subscribe(cliente => {
      // console.log(cliente);
      this.cliente = cliente;
      if (cliente != null) {
        this.params.set('cliente', this.forma.get('cliente').setValue(cliente.id));
      }
    })
  }

  exportarEnviosExcel() {
    this.envioService.exportarListaExcel(`${this.armarParams()}`);
  }

  armarParams() {
    this.params = new Map();
    if (this.forma.get('periodoBusqueda').value) {
      if (this.forma.get('periodoInicial').valid) {
        this.params.set('periodoInicial', this.forma.get('periodoInicial').value);
      } else {
        return ;
      }
      if (this.forma.get('periodoFinal').valid) {
        this.params.set('periodoFinal', this.forma.get('periodoFinal').value);
      } else {
        return;
      }
    }
    if (this.forma.get('estadoEnvio').value != '') {
      this.params.set('estadoEnvio', this.forma.get('estadoEnvio').value);
    }
    if (this.forma.get('estadoPago').value != '') {
      this.params.set('estadoPago', this.forma.get('estadoPago').value);
    }
    if (this.forma.get('cliente').value != '') {
      this.params.set('cliente', this.forma.get('cliente').value);
    }
    if (this.forma.get('proveedor').value != '') {
      this.params.set('proveedor', this.forma.get('proveedor').value);
    }
    if (this.forma.get('origen').value != '') {
      this.params.set('origen', this.forma.get('origen').value);
    }
    if (this.forma.get('destino').value != '') {
      this.params.set('destino', this.forma.get('destino').value);
    }
    let limite: number = this.params.size;
    let urlParams: string = '';
    const iterator = this.params[Symbol.iterator]();
    let contador = 0;

    if (this.params.size > 0) {
      for (const entry of this.params) {
        if (contador == this.params.size - 1) {
          urlParams = `${urlParams}${entry[0]}=${entry[1]}`;
          this.paramsURL = urlParams;
          return `?${urlParams}`;
        } else {
          urlParams = `${urlParams}${entry[0]}=${entry[1]}&`;
        }
        contador++;
      }
    } else {
      return urlParams;
    }
  }

  onImprimirGuia(guia: string) {
    console.log('Entra a imprimir guia: '+guia);
    this.envioService.imprimirGuia(guia)
    .subscribe(response => {
      console.log()
      this.descargar(response, 'application/pdf; charset=utf-8');
    })
  }

  descargar(data: any, type: string) {
    // console.log("Desde metodo descargar");
    let blob = new Blob([data], {type: type});

    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
  }

  onImprimitGuiaProveedor(guia: string) {
    console.log('Entra a imprimir guia: '+guia);
    this.etiquetaService.imprimirGuiaProveedor(guia)
    .subscribe(response => {
      this.descargar(response, 'application/pdf; charset=utf-8');
    })
  }

}
