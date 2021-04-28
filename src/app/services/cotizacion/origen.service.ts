import { Injectable } from '@angular/core';

const REMITENTE_O = 'remitente_o';
const CORREO_O = 'correo_o';
const TELEFONO_O = 'telefono_o';
const CP_O = 'cp_o';
const COLONIA_O = 'colonia_o';
const CALLE_O = 'calle_o';
const NUMEROEXT_O = 'numeroExt_o';
const NUMEROINT_O = 'numeroInt_o';
const CIUDAD_O = 'ciudad_o';
const ESTADO_O = 'estado_o';
const REFERENCIA_O = 'referencia_o';
const PAIS_O = 'pais_o';

@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  constructor() { }

  public getRemitente(): string {
    return localStorage.getItem(REMITENTE_O) || '';
  }

  public setRemitente(remitente: string) {
    localStorage.setItem(REMITENTE_O, remitente);
  }

  public getCorreo(): string {
    return localStorage.getItem(CORREO_O) || '';
  }

  public setCorreo(correo: string) {
    localStorage.setItem(CORREO_O, correo);
  }

  public getTelefono(): string {
    return localStorage.getItem(TELEFONO_O) || '';
  }

  public setTelefono(telefono: string) {
    localStorage.setItem(TELEFONO_O, telefono);
  }

  public getCPOrigen(): string {
    return localStorage.getItem(CP_O) || '';
  }

  public setCPOrigen(cpOrigen: string) {
    localStorage.setItem(CP_O, cpOrigen);
  }

  public getColoniaOrigen(): string {
    return localStorage.getItem(COLONIA_O) || '';
  }

  public setColoniaOrigen(coloniaOrigen: string) {
    localStorage.setItem(COLONIA_O, coloniaOrigen);
  }

  public getCalleOrigen(): string {
    return localStorage.getItem(CALLE_O) || '';
  }

  public setCalleOrigen(calleOrigen: string) {
    localStorage.setItem(CALLE_O, calleOrigen);
  }

  public getNumeroExtOrigen(): string {
    return localStorage.getItem(NUMEROEXT_O) || '';
  }

  public setNumeroExtOrigen(numeroExtOrigen: string) {
    localStorage.setItem(NUMEROEXT_O, numeroExtOrigen);
  }

  public getNumeroIntOrigen() {
    return localStorage.getItem(NUMEROINT_O) || '';
  }

  public setNumeroIntOrigen(numeroIntOrigen: string) {
    localStorage.setItem(NUMEROINT_O, numeroIntOrigen);
  }

  public getCiudad(): string {
    return localStorage.getItem(CIUDAD_O) || '';
  }

  public setCiudad(ciudad: string) {
    localStorage.setItem(CIUDAD_O, ciudad);
  }

  public getEstadoOrigen(): string {
    return localStorage.getItem(ESTADO_O) || '';
  }

  public setEstadoOrigen(estadoOrigen: string) {
    localStorage.setItem(ESTADO_O, estadoOrigen);
  }

  public getReferencia(): string {
    return localStorage.getItem(REFERENCIA_O) || '';
  }

  public setReferencia(referencia: string) {
    localStorage.setItem(REFERENCIA_O, referencia);
  }

  public getPais(): string {
    return localStorage.getItem(PAIS_O);
  }

  public setPais(pais: string) {
    localStorage.setItem(PAIS_O, pais);
  }


}
