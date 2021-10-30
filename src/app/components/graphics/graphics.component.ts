import { EstadosType } from './../../models/forms/estados.enum';
import { PerfilType } from './../../enums/perfil.enum';
import { TokenService } from './../../services/usuarios/token.service';
import { EnvioService } from './../../services/envio/envio.service';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { ColoresType } from 'src/app/enums/colores.enum';
import { ProveedorType } from 'src/app/enums/proveedor.enum';
import { ConteoProveedorEstadoEnvioType } from 'src/app/enums/contadores/conteoProveedorEstadoEnvio.enum';
import { ConteoFacturasType } from 'src/app/enums/contadores/conteoFacturas.enum';

declare function customInitFunctions();
interface Fechas {
  inicio: string,
  fin: string
}
interface ValorGrafica {
  valor: number,
  nombre: string
}
@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit{

  mes: string = '';

  constructor (
    private envioService: EnvioService,
    private tokenService: TokenService
  ) {}


  seleccionarBusquedaGraficas(perfiles: string[]) {
    perfiles.forEach(perfil => {
      console.log(perfil);
      switch(perfil) {
        case 'ROLE_ADMIN':
          this.perfil = PerfilType.ADMIN;
          this.buscarTSMO();
          break;
        case 'ROL_TSMO':
          this.perfil = PerfilType.TSMO;
          this.buscarTSMO();
          break;
        case 'ROL_CLIENTE':
          this.perfil = PerfilType.CLIENTE;
          this.buscarClientes();
          break;
      }
    })
  }

  // perfiles
  perfil: number;

  // contadores
  contadorEnvios: number = 0;
  contadorFacturas: number = 0;
  contadorClientes: number = 0;
  // TSMO
  contadorProvEdoEnvioTSMO: number = 0;
  contadorProvEdoEnvioENVIA: number = 0;

  colores: string[] = [];

  limiteEnvios: number = 2;
  limiteTSMO: number = 6;
  limiteENVIA: number = 6;
  limiteFacturas: number = 4;
  limiteClientes: number = 0;
  limite6: number = 0;

  coloresGraficas1prima: Color[] = [];

  fechas: Fechas;

  // Proveedor
  contadorTSMO: number = 0;
  contadorEnvia: number = 0;

  // Facturas
  contadorFacPagada: number = 0;
  contadorFacPendiente: number = 0;
  contadorFacRechazada: number = 0;
  contadorFacReembolso: number = 0;

  // Estado Envio
  // TSMO
  contadorProvEnvioRecoleccionTSMO: number = 0;
  contadorProvEnvioCaminoTSMO: number = 0;
  contadorProvEnvioDevueltoTSMO: number = 0;
  contadorProvEnvioEntregadoTSMO: number = 0;
  contadorProvEnvioCanceladoTSMO: number = 0;
  contadorProvEnvioPendienteTSMO: number = 0;
  // ENVIA
  contadorProvEnvioRecoleccionENVIA: number = 0;
  contadorProvEnvioCaminoENVIA: number = 0;
  contadorProvEnvioDevueltoENVIA: number = 0;
  contadorProvEnvioEntregadoENVIA: number = 0;
  contadorProvEnvioCanceladoENVIA: number = 0;
  contadorProvEnvioPendienteENVIA: number = 0;

  // Meses
  meses: string[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  mesSelect: string = '';
  mesNumber: number = 0;

  // CLientes
  clientes: any[] = [];
  valoresClientesNumeros: number[] = [];

  ngOnInit(): void {
    let fechaAhora = new Date();
    // this.fechas = this.asignarFechas();
    this.fechas = this.asignarFechasMes(fechaAhora.getMonth());
    // this.conteoProveedor('TSMO', this.fechas);
    // this.conteoProveedor('TSME', this.fechas);
    this.seleccionarBusquedaGraficas(this.tokenService.getAuthorities());

    // Recupera clientes
    this.recuperarClientes();

    customInitFunctions();
    this.colores = Object.values( ColoresType );

    this.coloresEnvios = this.cargarColores(this.limiteEnvios);
    this.coloresTSMO = this.cargarColores(this.limiteTSMO);
    this.coloresENVIA = this.cargarColores(this.limiteENVIA);
    this.coloresFacturas = this.cargarColores(this.limiteFacturas);

    this.coloresFacturasCliente = this.cargarColores(this.limiteFacturasCliente);
    document.getElementById('footer').style.position = "relative";
  }

  recuperarClientes() {
    this.clientes.splice(0, this.clientes.length);
    this.envioService.recuperarTodosLosClientes()
    .subscribe(listaClientes => {
      this.clientes = listaClientes;
      this.recorrerClientes(this.clientes);
    })
  }

  recorrerClientes(clientes: any[]) {
    clientes.forEach(cliente => {
      this.conteoClientePeriodo(cliente, this.fechas);
    })
  }

  // Gráficas Envios
  tituloEnvios: string = 'Envios';
  valoresEnvios: MultiDataSet = [];
  subtitulosEnvios: Label[] = ['TSMO', 'ENVIA'];
  coloresEnvios: Color[] = [];

  // Gráficas TSMO
  tituloTSMO: string = 'TSMO';
  valoresTSMO: MultiDataSet = [];
  subtitulosTSMO: Label[] = ['Recoleccion', 'Camino', 'Entregado', 'Devuelto', 'Cancelado', 'Pendiente'];
  coloresTSMO: Color[] = [];

  // Gráficas ENVIA
  tituloENVIA: string = 'ENVIA';
  valoresENVIA: MultiDataSet = [];
  subtitulosENVIA: Label[] = ['Recoleccion', 'Camino', 'Entregado', 'Devuelto', 'Cancelado', 'Pendiente'];
  coloresENVIA: Color[] = [];

  // Gráficas Facturas
  tituloFacturas: string = 'Envios cuentas';
  valoresFacturas: MultiDataSet = [];
  subtituloFacturas: Label[] = ['Pagada', 'Pendiente', 'Reembolso', 'Rechazada'];
  coloresFacturas: Color[] = [];

  // GRAFICAS DE CLIENTES
  tituloClientes: string = 'Clientes';
  valoresClientes: MultiDataSet = [];
  subtitulosClientes: Label[] = [];
  coloresClientes: Color[] = [];

  // Grafica de DESTINOS
  tituloDestinos: string = 'Destinos';
  valoresDestinos: MultiDataSet = [];
  subtituloDestinos: Label[] = [];
  coloresDestinos: Color[] = [];
  banderaDestino: boolean = false;

  coloresArray(limite: number): string[] {
    let colArray: string[] = []; let numero;
    for (let index = 0; index < limite; index++) {
      numero = this.getRandomArbitrary(0, 29);
      colArray.push(this.colores[Math.round(numero)]);
    }
    return colArray;
  }

  cargarColores( limite: number ): Color[] {
    return [
      { backgroundColor: this.coloresArray(limite)}
    ];
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  asignarFechas(): Fechas {
    let today = new Date();
    this.asignarMesString(today.getMonth());
    // Agregar mes
    // console.log('Mes Actual: ',today.getMonth());
    let mes: any = today.getMonth() + 1;
    if (mes < 10) {
      mes = `0${mes}`;

    }
    // console.log('Mes Actual (Despues): ', mes);
    // console.log('Mes Siguiente: ',today.getMonth() + 2);
    let nextMonth: any = today.getMonth()+2;
    if (nextMonth < 10) {
      nextMonth = `0${nextMonth}`;
    } else if (nextMonth > 11) {
      nextMonth = '01';
    }
    // console.log('Mes Siguiente (Despues):',nextMonth);
    // console.log(`inicio: ${today.getFullYear()}-${mes}-01, fin: ${today.getFullYear()}-${nextMonth}-01`);
    return {inicio: `${today.getFullYear()}-${mes}-01`, fin: `${today.getFullYear()}-${nextMonth}-01`};
  }

  asignarMesString(mesDate: number) {
    // console.log(mesDate);
    // let meses: string[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    this.mes = this.meses[mesDate];
  }

  obtenerPosicionMesNumber(mesDate: string) {
    this.mes
  }

  conteoProveedor(proveedor: string, fechas: Fechas) {
    console.log('Conteo Proveedor: '+proveedor);
    let respuesta: number;
    this.envioService.contarEnvioProveedorPeriodo(proveedor, fechas.inicio, fechas.fin)
    .subscribe(count => {
      console.log(`${proveedor}:${count}`);
      switch(proveedor) {
        case 'TSMO':
          console.log('Entra TSMO');
          this.contadorTSMO = count;
          this.valoresEnvios = [
            [this.contadorTSMO, this.contadorEnvia],
          ];
          this.contadorEnvios++;
          break;
        case 'TSME':
          console.log('Entra Envia');
          this.contadorEnvia = count;
          this.valoresEnvios = [
            [this.contadorTSMO, this.contadorEnvia],
          ];
          this.contadorEnvios++;
          break;
      }
      this.valoresEnvios = [
        [this.contadorTSMO, this.contadorEnvia],
      ]
    }, error => {
      return 0;
    })
    // return contadorProveedor;
  }

  conteoFacturas(factura: string, fechas: Fechas) {
    console.log('Conteo Factura: '+factura);
    let respuesta: number;
    this.envioService.contarEnvioFacturaPeriodo(factura, fechas.inicio, fechas.fin)
    .subscribe(count => {
      //console.log(`${factura}:${count}`);
      switch(factura) {
        case 'APROBADO':
          this.contadorFacPagada = count;
          this.valoresFacturas = [
            [this.contadorFacPagada, this.contadorFacPendiente, this.contadorFacReembolso, this.contadorFacRechazada]
          ];
          this.contadorFacturas++;
          //console.log('Contador Facturas: ',this.contadorFacturas);
          break;
        case 'RECHAZADO':
          this.contadorFacRechazada = count;
          this.valoresFacturas = [
            [this.contadorFacPagada, this.contadorFacPendiente, this.contadorFacReembolso, this.contadorFacRechazada]
          ];
          this.contadorFacturas++;
          // console.log('Contador Facturas: ',this.contadorFacturas);
          break;
        case 'PENDIENTE':
          this.contadorFacPendiente = count;
          this.valoresFacturas = [
            [this.contadorFacPagada, this.contadorFacPendiente, this.contadorFacReembolso, this.contadorFacRechazada]
          ];
          this.contadorFacturas++;
          // console.log('Contador Facturas: ',this.contadorFacturas);
          break;
        case 'REEMBOLSO':
          this.contadorFacReembolso = count;
          this.valoresFacturas = [
            [this.contadorFacPagada, this.contadorFacPendiente, this.contadorFacReembolso, this.contadorFacRechazada]
          ];
          this.contadorFacturas++;
          // console.log('Contador Facturas: ',this.contadorFacturas);
          break;
      }

    })
  }

  conteoProveedorEstadoEnvio(proveedor: string, estadoEnvio: string, fechas: Fechas) {
    // console.log('Conteo Proveedor Estado Envio: '+proveedor+" : "+estadoEnvio);
    let respuesta: number;
    this.envioService.contarEnvioProveedorEstadoEnvioPeriodo(proveedor, estadoEnvio, fechas.inicio, fechas.fin)
    .subscribe(count => {
      // console.log(`${proveedor} ${estadoEnvio}: ${count}`);

      switch(proveedor) {
        case 'TSMO':
          switch(estadoEnvio) {
            case 'RECOLECCION':
              this.contadorProvEnvioRecoleccionTSMO = count;
              this.valoresTSMO = [
                [this.contadorProvEnvioRecoleccionTSMO, this.contadorProvEnvioCaminoTSMO, this.contadorProvEnvioEntregadoTSMO, this.contadorProvEnvioDevueltoTSMO, this.contadorProvEnvioCanceladoTSMO, this.contadorProvEnvioPendienteTSMO],
              ];
              this.contadorProvEdoEnvioTSMO++;
              // console.log('Contador Proveedor TSMO: ',this.contadorProvEdoEnvioTSMO);
              break;
            case 'CAMINO':
              this.contadorProvEnvioCaminoTSMO = count;
              this.valoresTSMO = [
                [this.contadorProvEnvioRecoleccionTSMO, this.contadorProvEnvioCaminoTSMO, this.contadorProvEnvioEntregadoTSMO, this.contadorProvEnvioDevueltoTSMO, this.contadorProvEnvioCanceladoTSMO, this.contadorProvEnvioPendienteTSMO],
              ];
              this.contadorProvEdoEnvioTSMO++;
              // console.log('Contador Proveedor TSMO: ',this.contadorProvEdoEnvioTSMO);
              break;
            case 'ENTREGADO':
              this.contadorProvEnvioEntregadoTSMO = count;
              this.valoresTSMO = [
                [this.contadorProvEnvioRecoleccionTSMO, this.contadorProvEnvioCaminoTSMO, this.contadorProvEnvioEntregadoTSMO, this.contadorProvEnvioDevueltoTSMO, this.contadorProvEnvioCanceladoTSMO, this.contadorProvEnvioPendienteTSMO],
              ];
              this.contadorProvEdoEnvioTSMO++;
              // console.log('Contador Proveedor TSMO: ',this.contadorProvEdoEnvioTSMO);
              break;
            case 'DEVUELTO':
              this.contadorProvEnvioDevueltoTSMO = count;
              this.valoresTSMO = [
                [this.contadorProvEnvioRecoleccionTSMO, this.contadorProvEnvioCaminoTSMO, this.contadorProvEnvioEntregadoTSMO, this.contadorProvEnvioDevueltoTSMO, this.contadorProvEnvioCanceladoTSMO, this.contadorProvEnvioPendienteTSMO],
              ];
              this.contadorProvEdoEnvioTSMO++;
              // console.log('Contador Proveedor TSMO: ',this.contadorProvEdoEnvioTSMO);
              break;
            case 'CANCELADO':
              this.contadorProvEnvioCanceladoTSMO = count;
              this.valoresTSMO = [
                [this.contadorProvEnvioRecoleccionTSMO, this.contadorProvEnvioCaminoTSMO, this.contadorProvEnvioEntregadoTSMO, this.contadorProvEnvioDevueltoTSMO, this.contadorProvEnvioCanceladoTSMO, this.contadorProvEnvioPendienteTSMO],
              ];
              this.contadorProvEdoEnvioTSMO++;
              // console.log('Contador Proveedor TSMO: ',this.contadorProvEdoEnvioTSMO);
              break;
            case 'PENDIENTE':
              this.contadorProvEnvioPendienteTSMO = count;
              this.valoresTSMO = [
                [this.contadorProvEnvioRecoleccionTSMO, this.contadorProvEnvioCaminoTSMO, this.contadorProvEnvioEntregadoTSMO, this.contadorProvEnvioDevueltoTSMO, this.contadorProvEnvioCanceladoTSMO, this.contadorProvEnvioPendienteTSMO],
              ]
              break;
          }

          break;
        case 'TSME':
          switch(estadoEnvio) {
            case 'RECOLECCION':
              this.contadorProvEnvioRecoleccionENVIA = count;
              this.valoresENVIA = [
                [this.contadorProvEnvioRecoleccionENVIA, this.contadorProvEnvioCaminoENVIA, this.contadorProvEnvioEntregadoENVIA, this.contadorProvEnvioDevueltoENVIA, this.contadorProvEnvioCanceladoENVIA, this.contadorProvEnvioPendienteENVIA],
              ];
              this.contadorProvEdoEnvioENVIA++;
              // console.log('Contador Proveedor ENVIA: ',this.contadorProvEdoEnvioENVIA);
              break;
            case 'CAMINO':
              this.contadorProvEnvioCaminoENVIA = count;
              this.valoresENVIA = [
                [this.contadorProvEnvioRecoleccionENVIA, this.contadorProvEnvioCaminoENVIA, this.contadorProvEnvioEntregadoENVIA, this.contadorProvEnvioDevueltoENVIA, this.contadorProvEnvioCanceladoENVIA, this.contadorProvEnvioPendienteENVIA],
              ];
              this.contadorProvEdoEnvioENVIA++;
              // console.log('Contador Proveedor ENVIA: ',this.contadorProvEdoEnvioENVIA);
              break;
            case 'ENTREGADO':
              this.contadorProvEnvioEntregadoENVIA = count;
              this.valoresENVIA = [
                [this.contadorProvEnvioRecoleccionENVIA, this.contadorProvEnvioCaminoENVIA, this.contadorProvEnvioEntregadoENVIA, this.contadorProvEnvioDevueltoENVIA, this.contadorProvEnvioCanceladoENVIA, this.contadorProvEnvioPendienteENVIA],
              ];
              this.contadorProvEdoEnvioENVIA++;
              // console.log('Contador Proveedor ENVIA: ',this.contadorProvEdoEnvioENVIA);
              break;
            case 'DEVUELTO':
              this.contadorProvEnvioDevueltoENVIA = count;
              this.valoresENVIA = [
                [this.contadorProvEnvioRecoleccionENVIA, this.contadorProvEnvioCaminoENVIA, this.contadorProvEnvioEntregadoENVIA, this.contadorProvEnvioDevueltoENVIA, this.contadorProvEnvioCanceladoENVIA, this.contadorProvEnvioPendienteENVIA],
              ];
              this.contadorProvEdoEnvioENVIA++;
              // console.log('Contador Proveedor ENVIA: ',this.contadorProvEdoEnvioTSMO);
              break;
            case 'CANCELADO':
              this.contadorProvEnvioCanceladoENVIA = count;
              this.valoresENVIA = [
                [this.contadorProvEnvioRecoleccionENVIA, this.contadorProvEnvioCaminoENVIA, this.contadorProvEnvioEntregadoENVIA, this.contadorProvEnvioDevueltoENVIA, this.contadorProvEnvioCanceladoENVIA, this.contadorProvEnvioPendienteENVIA],
              ];
              this.contadorProvEdoEnvioENVIA++;
              // console.log('Contador Proveedor ENVIA: ',this.contadorProvEdoEnvioENVIA);
              break;
            case 'PENDIENTE':
              // console.log("PENDIENTE ENVIA: "+count);
              this.contadorProvEnvioPendienteENVIA = count;
              this.valoresENVIA = [
                [this.contadorProvEnvioRecoleccionENVIA, this.contadorProvEnvioCaminoENVIA, this.contadorProvEnvioEntregadoENVIA, this.contadorProvEnvioDevueltoENVIA, this.contadorProvEnvioCanceladoENVIA, this.contadorProvEnvioPendienteENVIA],
              ];
              this.contadorProvEdoEnvioENVIA++;
          }
          break;
      }
    });

  }

  valoresTodosClientes: Object[] = [];
  valor: number[] = [];
  cliente: string[] = [];
  conteoClientePeriodo(cliente: any, fechas: Fechas) {
    // console.log('Entra a conteo Cliente: '+cliente);
    // console.log(cliente);
    // console.log(cliente[0]);
    // console.log(cliente[1]);
    this.valoresTodosClientes.splice(0, this.valoresTodosClientes.length);
    this.envioService.contarEnvioClientePeriodo(cliente[0], fechas.inicio, fechas.fin)
    .subscribe(count => {
      if (count > 0) {
        let valor: ValorGrafica = {valor: count, nombre: cliente[1]};
        this.valoresTodosClientes.push(valor);
      }
      this.contadorClientes++;
      if(this.contadorClientes == this.clientes.length) {
        this.mostarGraficaClientes(this.valoresTodosClientes);
      }
    })
  }

  banderaMostrarCliente: boolean = false;
  mostarGraficaClientes(valoresTodosClientes: Object[]) {
    // console.log('Mostrar grafica cliente: ');
    this.banderaMostrarCliente = false;
    let contador: number = 0;
    this.subtitulosClientes.splice(0, this.subtitulosClientes.length);
    this.valoresClientesNumeros.splice(0, this.valoresClientesNumeros.length);
    this.valoresClientes.splice(0, this.valoresClientes.length);
    valoresTodosClientes.forEach(valores => {
      this.valoresClientesNumeros.push(valores['valor']);
      this.subtitulosClientes.push(valores['nombre']);
      this.valoresClientes = [
        this.valoresClientesNumeros,
      ]
      contador++;
      if (contador == valoresTodosClientes.length) {
        this.banderaMostrarCliente = true;
        this.limiteClientes = valoresTodosClientes.length;
      }
    })
  }

  buscarTSMO() {
    console.log('Entra a buscar valores TSMO');
    Object.values( ProveedorType ).forEach(proveedor => {
      this.conteoProveedor(proveedor, this.fechas);
    })

    Object.values( ConteoFacturasType ).forEach(factura => {
      this.conteoFacturas(factura, this.fechas);
    })

    Object.values( ProveedorType ).forEach( proveedor => {
      Object.values( ConteoProveedorEstadoEnvioType ).forEach( edoEnvio => {
        this.conteoProveedorEstadoEnvio(proveedor, edoEnvio, this.fechas);
      })
    });

    this.conteoDestinoPeriodo(this.fechas);
  }

  valoresTodosDestinos: Object[] = [];

  conteoDestinoPeriodo(fechas: Fechas) {
    // console.log('Entra conteo Destino Periodo');
    let bandera = 0;
    this.subtituloDestinos.splice(0, this.subtituloDestinos.length);
    this.envioService.conteoEnvioDestinoPeriodo(fechas.inicio, fechas.fin)
    .subscribe(map => {
      // console.log(map);
      // console.log();
      // console.log('KEYS');

      this.coloresDestinos = this.cargarColores(Object.keys(map).length);
      let valoresDestino: string[] = [];
      let valoresGrafica: number[] = [];
      Object.keys( map ).forEach(destino => {
        // console.log(destino);
        valoresDestino.push(destino);
        // console.log(valoresDestino);
        // this.subtituloDestinos = [
        //   valoresDestino,
        // ]
        this.subtituloDestinos.push(destino);
      })
      // console.log('VALUES');
      Object.values( map ).forEach(valor => {
        // console.log(valor);
        valoresGrafica.push(valor);
        // console.log(valoresGrafica);
        this.valoresDestinos = [
          valoresGrafica,
        ]
      })
      bandera++;
      // console.log(`Bandera: ${bandera}, map.length: ${Object.keys(map).length}`);
      let timeout = 1500;
      setTimeout(() => {
        if (Object.keys(map).length == Object.keys(valoresDestino).length && Object.keys(map).length == Object.keys(valoresGrafica).length) {
          // console.log('Es igual');
          this.banderaDestino = true;
        }
      }, timeout);

      // console.log(map.map);
      // let mapR = new Map(map);
      // mapR = new map;
      // console.log(map.size);
      // console.log(map.get(1));
      // console.log(map.get(2));
      // console.log('FOR EACH');
      // map.array.forEach(element => {
      //   console.log(element);

      // });
      // console.log('FOR CONST');
      // for (const [key, value] of map) {
      //   console.log(`key: ${key}, value: ${value}`);
      // }
      // map.forEach((value, key, theMap) => console.log(`key: ${key}, value: ${value}`));
      // if (count > 0) {
      //   let valor: ValorGrafica = {valor: count, nombre: cliente[1]};
      //   this.valoresTodosClientes.push(valor);
      // }
      // this.contadorClientes++;
      // if(this.contadorClientes == this.clientes.length) {
      //   this.mostarGraficaClientes(this.valoresTodosClientes);
      // }
    })
  }


  // ========= CLIENTES ============ //

  // ========= Envios ============== //

  tituloEnviosCliente: string = 'Envios';
  valoresEnviosCliente: MultiDataSet = [];
  subtitulosEnviosCliente: Label[] = ['Pendiente', 'Recoleccion', 'Camino', 'Entregado', 'Devuelto', 'Cancelado'];
  coloresEnviosCliente: Color[] = [];
  limiteEnviosCliente: number = 6;

  // Buscar valores para gráifcas de clientes
  buscarClientes() {
    Object.values( ConteoProveedorEstadoEnvioType ).forEach( edoEnvio => {
      this.conteoClienteEstadoEnvio(this.tokenService.getUserName(), edoEnvio, this.fechas);
    })

    Object.values( ConteoFacturasType ).forEach( edoPago => {
      this.conteoClientesFacturasPeriodo(this.tokenService.getUserName(), edoPago, this.fechas);
    })
  }

  contadorClienteEstadoEnvio: number = 0;
  contadorClienteEstadoEnvioRecoleccion: number;
  contadorClienteEstadoEnvioCamino: number;
  contadorClienteEstadoEntregado: number;
  contadorClienteEstadoDevuelto: number;
  contadorClienteEstadoPendiente: number;
  contadorClienteEstadoCancelado: number;
  conteoClienteEstadoEnvio(cliente: string, edoEnvio: string, fechas: Fechas) {
    // conteoProveedorEstadoEnvio(proveedor: string, estadoEnvio: string, fechas: Fechas) {
      this.envioService.contarEnvioClienteEstadoEnvioPeriodo(cliente, edoEnvio, fechas.inicio, fechas.fin)
      .subscribe(count => {
        switch(edoEnvio) {
          case ConteoProveedorEstadoEnvioType.PENDIENTE:
            this.contadorClienteEstadoPendiente = count;
            this.valoresEnviosCliente = [
              [this.contadorClienteEstadoPendiente, this.contadorClienteEstadoEnvioRecoleccion, this.contadorClienteEstadoEnvioCamino, this.contadorClienteEstadoEntregado, this.contadorClienteEstadoDevuelto, this.contadorClienteEstadoCancelado],
            ];
            this.contadorClienteEstadoEnvio++;
            break;
          case ConteoProveedorEstadoEnvioType.RECOLECCION:
            this.contadorClienteEstadoEnvioRecoleccion = count;
            this.valoresEnviosCliente = [
              [this.contadorClienteEstadoPendiente, this.contadorClienteEstadoEnvioRecoleccion, this.contadorClienteEstadoEnvioCamino, this.contadorClienteEstadoEntregado, this.contadorClienteEstadoDevuelto, this.contadorClienteEstadoCancelado],
            ];
            this.contadorClienteEstadoEnvio++;
            break;
          case ConteoProveedorEstadoEnvioType.CANCELADO:
            this.contadorClienteEstadoCancelado = count;
            this.valoresEnviosCliente = [
              [this.contadorClienteEstadoPendiente, this.contadorClienteEstadoEnvioRecoleccion, this.contadorClienteEstadoEnvioCamino, this.contadorClienteEstadoEntregado, this.contadorClienteEstadoDevuelto, this.contadorClienteEstadoCancelado],
            ];
            this.contadorClienteEstadoEnvio++;
            break;
          case ConteoProveedorEstadoEnvioType.CAMINO:
            this.contadorClienteEstadoEnvioCamino = count;
            this.valoresEnviosCliente = [
              [this.contadorClienteEstadoPendiente, this.contadorClienteEstadoEnvioRecoleccion, this.contadorClienteEstadoEnvioCamino, this.contadorClienteEstadoEntregado, this.contadorClienteEstadoDevuelto, this.contadorClienteEstadoCancelado],
            ];
            this.contadorClienteEstadoEnvio++;
            break;
          case ConteoProveedorEstadoEnvioType.ENTREGADO:
            this.contadorClienteEstadoEntregado = count;
            this.valoresEnviosCliente = [
              [this.contadorClienteEstadoPendiente, this.contadorClienteEstadoEnvioRecoleccion, this.contadorClienteEstadoEnvioCamino, this.contadorClienteEstadoEntregado, this.contadorClienteEstadoDevuelto, this.contadorClienteEstadoCancelado],
            ];
            this.contadorClienteEstadoEnvio++;
            break;
          case ConteoProveedorEstadoEnvioType.DEVUELTO:
            this.contadorClienteEstadoDevuelto = count;
            this.valoresEnviosCliente = [
              [this.contadorClienteEstadoPendiente, this.contadorClienteEstadoEnvioRecoleccion, this.contadorClienteEstadoEnvioCamino, this.contadorClienteEstadoEntregado, this.contadorClienteEstadoDevuelto, this.contadorClienteEstadoCancelado],
            ];
            this.contadorClienteEstadoEnvio++;
            break;
        }
      })
  }

  // ========== Facturas ============= //

  tituloFacturasCliente: string = 'Facturas';
  valoresFacturasCliente: MultiDataSet = [];
  subtitulosFacturasCliente: Label[] = ['Aprobado', 'Cancelado', 'Pendiente', 'Rechazado', 'Reembolso'];
  coloresFacturasCliente: Color[] = [];
  limiteFacturasCliente: number = 5;

  contadorClienteFactura: number = 0;
  contadorClienteFacturaAprobado: number;
  contadorClienteFacturaPendiente: number;
  contadorClienteFacturaRechazado: number;
  contadorClienteFacturaCancelado: number;
  contadorClienteFacturaReembolso: number;
  conteoClientesFacturasPeriodo(cliente: string, factura: string, fechas: Fechas) {
    this.envioService.conteoEnvioClienteFacturaPeriodo(cliente, factura, fechas.inicio, fechas.fin)
    .subscribe(count => {
      switch(factura) {
        case ConteoFacturasType.APROBADO:
          this.contadorClienteFacturaAprobado = count;
          this.valoresFacturasCliente = [
            [this.contadorClienteFacturaAprobado, this.contadorClienteFacturaCancelado, this.contadorClienteFacturaPendiente, this.contadorClienteFacturaRechazado, this.contadorClienteEstadoDevuelto, this.contadorClienteFacturaReembolso],
          ];
          this.contadorClienteFactura++;
          break;
        case ConteoFacturasType.CANCEALDO:
          this.contadorClienteFacturaCancelado = count;
          this.valoresFacturasCliente = [
            [this.contadorClienteFacturaAprobado, this.contadorClienteFacturaCancelado, this.contadorClienteFacturaPendiente, this.contadorClienteFacturaRechazado, this.contadorClienteEstadoDevuelto, this.contadorClienteFacturaReembolso],
          ];
          this.contadorClienteFactura++;
          break;
        case ConteoFacturasType.PENDIENTE:
          this.contadorClienteFacturaPendiente = count;
          this.valoresFacturasCliente = [
            [this.contadorClienteFacturaAprobado, this.contadorClienteFacturaCancelado, this.contadorClienteFacturaPendiente, this.contadorClienteFacturaRechazado, this.contadorClienteEstadoDevuelto, this.contadorClienteFacturaReembolso],
          ];
          this.contadorClienteFactura++;
          break;
        case ConteoFacturasType.RECHAZADO:
          this.contadorClienteFacturaRechazado = count;
          this.valoresFacturasCliente = [
            [this.contadorClienteFacturaAprobado, this.contadorClienteFacturaCancelado, this.contadorClienteFacturaPendiente, this.contadorClienteFacturaRechazado, this.contadorClienteEstadoDevuelto, this.contadorClienteFacturaReembolso],
          ];
          this.contadorClienteFactura++;
          break;
        case ConteoFacturasType.REEMBOLSO:
          this.contadorClienteFacturaReembolso = count;
          this.valoresFacturasCliente = [
            [this.contadorClienteFacturaAprobado, this.contadorClienteFacturaCancelado, this.contadorClienteFacturaPendiente, this.contadorClienteFacturaRechazado, this.contadorClienteEstadoDevuelto, this.contadorClienteFacturaReembolso],
          ];
          this.contadorClienteFactura++;
          break;
      }
    })
  }

  // Asignar Fechas Para busqeuda de resyemn mensual

  // Mes
  cambiarGraficas(mes: string) {
    // console.log(this.clientes);
    // console.log(this.subtitulosClientes);
    this.clientes = [];
    // console.log('Ingresa a cambiar mes', this.mesSelect);
    // console.log(this.meses.findIndex(element => element == this.mesSelect));
    this.contadorEnvios = 0;
    this.contadorFacturas = 0;
    this.contadorClientes = 0;
    this.fechas = this.asignarFechasMes(this.meses.findIndex(element => element == this.mesSelect));
    this.seleccionarBusquedaGraficas(this.tokenService.getAuthorities());
    // Recupera clientes
    this.recuperarClientes();
  }

  asignarFechasMes(mesIn: number): Fechas {
    let today = new Date();
    this.asignarMesString(mesIn);
    // Agregar mes
    // console.log('Mes Actual: ',today.getMonth());
    let mes: any = mesIn + 1;
    if (mes < 10) {
      mes = `0${mes}`;
    }
    // console.log('Mes Actual (Despues): ', mes);
    // console.log('Mes Siguiente: ',today.getMonth() + 2);
    let nextMonth: any = mesIn + 2;
    if (nextMonth < 10) {
      nextMonth = `0${nextMonth}`;
    } else if (nextMonth > 11) {
      nextMonth = '01';
    }
    // console.log('Mes Siguiente (Despues):',nextMonth);
    // console.log(`inicio: ${today.getFullYear()}-${mes}-01, fin: ${today.getFullYear()}-${nextMonth}-01`);
    return {inicio: `${today.getFullYear()}-${mes}-01`, fin: `${today.getFullYear()}-${nextMonth}-01`};
  }

  proveedores: string[] = ['TSMO', 'ENVIA'];
  recorrerValoresGraficaEnvios() {
    this.proveedores.forEach(proveedor => {

    })
  }

  buscarValoresGraficaEnvios(proveedor: string) {
    // this.
  }


}
