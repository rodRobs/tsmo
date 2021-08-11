import { map } from 'rxjs/operators';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { DocumentacionDto } from './../../models/dto/documentacionDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';
import { HostType } from 'src/app/enums/host.enum';

// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
const URL = 'http://localhost:8080/';
const ENVIOS = 'envios';
const ENVIO = 'envio';
const DOCUMENTACION = 'documentacion';
const GUIA = 'guia';
const ACT_PAGO = '/actualizarPago/';
const ACT_ENV = '/actualizarEstadoEnvio/';
const BUSCAR_GUIA = 'buscar/';
const BUSQUEDA_FILTROS = '/buscar/filtros/params';
const CONTAR_PROVEEDOR_PERIODO = '/count/proveedor/periodo/';
const CONTAR_FACTURA_PERIODO = '/count/factura/periodo/';
const CONTAR_PROVEEDOR_ESTADOENVIO_PERIODO = '/count/proveedor/'
const PERIODO = 'periodo';
const CONTAR_CLIENTE = '/count/cliente/';
const CLIENTES = 'clientes'
const GUARDAR_USER_TSMO = '/guardar/usuario/';
const GUARDAR_CLIENTE_TSMO = '/guardar/cliente/'
const GUIA_PROVEEDOR = '/proveedor/guia';
const LISTAR_DESTINOS = '/listar/destinos/';
const ACTUALIZAR_EDO_PAGO = '/actualizar/pago/';
const EXPORTAR_EXCEL = '/exportar/excel';
const IMPRIMIR_GUIA = '/imprimir/';
@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  constructor(
    private http: HttpClient
  ) { }

  documentacion(documentacionDto: DocumentacionDto) {
    return this.http.post(HostType.HOST, documentacionDto);
  }

  guardar(envio: EnvioDto, cliente: number, documentacion: number, proveedor: string, tipoPaquete: string, usuario: string) {
    // console.log(envio);
    return this.http.post<EnvioDto>(`${HostType.HOST}${ENVIOS}/${cliente}/${documentacion}/${proveedor}/${tipoPaquete}/${usuario}`, envio);
  }

  getGuia(): string {
    return localStorage.getItem(GUIA) || '';
  }

  setGuia(guia: string) {
    localStorage.setItem(GUIA, guia);
  }

  actualizarEstado(estadoEnvio: string, envio: EnvioDto) {
    return this.http.post<EnvioDto>(`${HostType.HOST}${ENVIOS}${ACT_ENV}${estadoEnvio}`, envio);
  }

  actualizarEstadoPago(estadoPago: string, envio: EnvioDto) {
    // console.log('Desde servicio Envio: ', envio);
    return this.http.post<EnvioDto>(`${HostType.HOST}${ENVIOS}${ACT_PAGO}${estadoPago}`, envio);
  }

  buscarEnvioPorGuia(guia: string) {
    return this.http.get<EnvioMostrar>(`${HostType.HOST}${ENVIOS}/${BUSCAR_GUIA}${guia}`);
  }

  buscarEnvioPorFiltros(params: string) {
    return this.http.get<EnvioMostrar[]>(`${HostType.HOST}${ENVIOS}${BUSQUEDA_FILTROS}${params}`);
  }

  contarEnvioProveedorPeriodo(proveedor: string, fechaInicial: string, fechaFinal: string) {
    // console.log(`${URL}${ENVIOS}${CONTAR_PROVEEDOR_PERIODO}${proveedor}/${fechaInicial}/${fechaFinal}`);
    return this.http.get<number>(`${HostType.HOST}${ENVIOS}${CONTAR_PROVEEDOR_PERIODO}${proveedor}/${fechaInicial}/${fechaFinal}`);
  }

  contarEnvioFacturaPeriodo(factura: string, fechaInicial: string, fechaFinal: string) {
    // console.log(`${URL}${ENVIOS}${CONTAR_FACTURA_PERIODO}${factura}/${fechaInicial}/${fechaFinal}`);
    return this.http.get<number>(`${HostType.HOST}${ENVIOS}${CONTAR_FACTURA_PERIODO}${factura}/${fechaInicial}/${fechaFinal}`);
  }

  contarEnvioProveedorEstadoEnvioPeriodo(proveedor: string, estadoEnvio: string, fechaInicial: string, fechaFinal: string) {
    // console.log(`${URL}${ENVIOS}${CONTAR_PROVEEDOR_ESTADOENVIO_PERIODO}${proveedor}/${ENVIO}/${estadoEnvio}/${PERIODO}/${fechaInicial}/${fechaFinal}`);
    return this.http.get<number>(`${HostType.HOST}${ENVIOS}${CONTAR_PROVEEDOR_ESTADOENVIO_PERIODO}${proveedor}/${ENVIO}/${estadoEnvio}/${PERIODO}/${fechaInicial}/${fechaFinal}`);
  }

  contarEnvioClientePeriodo(cliente: string, fechaInicial: string, fechaFinal) {
    return this.http.get<number>(`${HostType.HOST}${ENVIOS}${CONTAR_CLIENTE}${cliente}/${PERIODO}/${fechaInicial}/${fechaFinal}`);
  }

  contarEnvioClienteEstadoEnvioPeriodo(cliente: string, estadoEnvio: string, fechaInicial: string, fechaFinal: string) {
    // console.log(`${URL}${ENVIOS}${CONTAR_CLIENTE}${cliente}/edoEnv/${estadoEnvio}/${PERIODO}/${fechaInicial}/${fechaFinal}`);
    return this.http.get<number>(`${HostType.HOST}${ENVIOS}${CONTAR_CLIENTE}${cliente}/edoEnv/${estadoEnvio}/${PERIODO}/${fechaInicial}/${fechaFinal}`);
  }

  conteoEnvioClienteFacturaPeriodo(cliente: string, estadoPago: string, fechaInicial: string, fechaFinal: string) {
    // console.log(`${URL}${ENVIOS}${CONTAR_CLIENTE}${cliente}/edoPgo/${estadoPago}/${PERIODO}/${fechaInicial}/${fechaFinal}`);
    return this.http.get<number>(`${HostType.HOST}${ENVIOS}${CONTAR_CLIENTE}${cliente}/edoPgo/${estadoPago}/${PERIODO}/${fechaInicial}/${fechaFinal}`);
  }

  conteoEnvioDestinoPeriodo(fechainicial: string, fechaFinal: string) {
    return this.http.get<typeof Map>(`${HostType.HOST}${ENVIOS}${LISTAR_DESTINOS}${fechainicial}/${fechaFinal}`);
  }

  recuperarTodosLosClientes() {
    return this.http.get<any[]>(`${HostType.HOST}${ENVIOS}/${CLIENTES}`);
  }

  guardarUsuarioTSMO(envio: EnvioDto, documentacion: number, proveedor: string, tipoPaquete: string, usuario: string) {
    // console.log(`${URL}${ENVIOS}${GUARDAR_USER_TSMO}${documentacion}/${proveedor}/${tipoPaquete}/${usuario}`);
    return this.http.post<any>(`${HostType.HOST}${ENVIOS}${GUARDAR_USER_TSMO}${documentacion}/${proveedor}/${tipoPaquete}/${usuario}`, envio);
    // return this.http.get<any>(`${URL}${ENVIOS}${GUARDAR_USER_TSMO}${documentacion}/${proveedor}/${tipoPaquete}/${usuario}`);
  }

  guardarClienteTSMO(envio: EnvioDto, documentacion: number, proveedor: string, tipoPaquete: string, usuario: string) {
    // console.log(`${URL}${ENVIOS}${GUARDAR_CLIENTE_TSMO}${usuario}/${documentacion}/${proveedor}/${tipoPaquete}`);
    return this.http.post<any>(`${HostType.HOST}${ENVIOS}${GUARDAR_CLIENTE_TSMO}${usuario}/${documentacion}/${proveedor}/${tipoPaquete}`, envio);
  }

  actualizarGuiaProveedor(envio: EnvioDto) {
    return this.http.post<any>(`${HostType.HOST}${ENVIOS}${GUIA_PROVEEDOR}`, envio);
  }

  actualizarEstadoPagoTSMO(envio: number, estadoPago: string) {
    return this.http.get<number>(`${HostType.HOST}${ENVIOS}${ACTUALIZAR_EDO_PAGO}${envio}/${estadoPago}`);
  }

  exportarListaExcel(params: string) {
    console.log(`${HostType.HOST}${ENVIOS}${EXPORTAR_EXCEL}${params}`);
    window.open(`${HostType.HOST}${ENVIOS}${EXPORTAR_EXCEL}${params}`, '_blank');
    // return this.http.post(`${URL}${ENVIOS}${EXPORTAR_EXCEL}`, envios);
  }

  imprimirGuia(guia: string) {
    return this.http.get(`${HostType.HOST}${ENVIOS}${IMPRIMIR_GUIA}${guia}`, {responseType: 'arraybuffer'});
  }

}
