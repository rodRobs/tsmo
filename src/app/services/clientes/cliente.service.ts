import { ClienteDto } from './../../models/dto/clienteDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const NOMBRE = "nombre";
const APAT = "apar";
const AMAT = "amat";
const CORREO = "correo";
const TELEFONO_CASA = "casa";
const CELULAR = "celular";
const CP = "cp";
const COLONIA = "colonia";
const CALLE = "calle";
const NUMERO = "numero";
const MUNICIPIO = "municipio";
const ESTADO = "estado";

const URL = 'http://localhost:8080/';
const CLIENTES = 'clientes';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  public guardarCliente(cliente: ClienteDto) {
    return this.http.post<number>(`${URL}${CLIENTES}`, cliente);
  }

  public getNombre(): string {
    return localStorage.getItem(NOMBRE) || '';
  }

  public setNombre(nombre: string) {
    localStorage.setItem(NOMBRE, nombre);
  }

  public getApat(): string {
    return localStorage.getItem(APAT) || '';
  }

  public setApat(apat: string) {
    localStorage.setItem(APAT, apat);
  }

  public getAmat(): string {
    return localStorage.getItem(AMAT) || '';
  }

  public setAmat(amat: string) {
    localStorage.setItem(AMAT, amat);
  }

  public getCorreo(): string {
    return localStorage.getItem(CORREO) || '';
  }

  public setCorreo(correo: string) {
    localStorage.setItem(CORREO, correo);
  }

  public getTelCasa(): string {
    return localStorage.getItem(TELEFONO_CASA) || '';
  }

  public setTelCasa(casa: string) {
    localStorage.setItem(TELEFONO_CASA, casa);
  }

  public getCelular(): string {
    return localStorage.getItem(CELULAR) || '';
  }

  public setCelular(celular: string) {
    localStorage.setItem(CELULAR, celular);
  }

  public getCP(): string {
    return localStorage.getItem(CP) || '';
  }

  public setCP(cp: string) {
    localStorage.setItem(CP, cp);
  }

  public getColonia(): string {
    return localStorage.getItem(COLONIA) || '';
  }

  public setColonia(colonia: string) {
    localStorage.setItem(COLONIA, colonia);
  }

  public getCalle(): string {
    return localStorage.getItem(CALLE) || '';
  }

  public setCalle(calle: string) {
    localStorage.setItem(CALLE, calle);
  }

  public getNumero(): string {
    return localStorage.getItem(NUMERO) || '';
  }

  public setNumero(numero: string) {
    localStorage.setItem(NUMERO, numero);
  }

  public getMunicipio(): string {
    return localStorage.getItem(MUNICIPIO) || '';
  }

  public setMunicipio(municipio: string) {
    localStorage.setItem(MUNICIPIO, municipio);
  }

  public getEstado(): string {
    return localStorage.getItem(ESTADO) || '';
  }

  public setEstado(estado: string) {
    localStorage.setItem(ESTADO, estado);
  }



}
