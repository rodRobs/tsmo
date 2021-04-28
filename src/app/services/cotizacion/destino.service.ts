import { Injectable } from '@angular/core';

const DESTINATARIO_D = 'destinatario_d';
const DESTINATARIO_DOS_D = 'destinatario_dos_d';
const CORREO_D = 'correo_d';
const CP_D = 'cp_d';
const COLONIA_D = 'colonia_d';
const CALLE_D = 'calle_d';
const NUMEROEXT_D = 'numeroExt_d';
const NUMEROINT_D = 'muneroInt_d';
const CIUDAD_D = 'deleg_d';
const ESTADO_D = 'estado_d';
const REFERENCIA_D = 'referencia_d';
const TELEFONO_D = 'telefono_d';
const PAIS_D = 'paso_D'

@Injectable({
  providedIn: 'root'
})
export class DestinoService {

  constructor() { }

  public getDestinatario(): string {
    return localStorage.getItem(DESTINATARIO_D) || '';
  }

  public setDestinatario(destinatario: string) {
    localStorage.setItem(DESTINATARIO_D, destinatario);
  }

  public getDestinatarioDos(): string {
    return localStorage.getItem(DESTINATARIO_DOS_D) || '';
  }

  public setDestinatarioDos(destinatario_dos: string) {
    localStorage.setItem(DESTINATARIO_DOS_D, destinatario_dos);
  }

  public getCorreo(): string {
    return localStorage.getItem(CORREO_D) || '';
  }

  public setCorreo(correo: string) {
    localStorage.setItem(CORREO_D, correo);
  }

  public getCPDestino(): string {
    return localStorage.getItem(CP_D) || '';
  }

  public setCPDestino(cpOrigen: string) {
    localStorage.setItem(CP_D, cpOrigen);
  }

  public getColoniaDestino(): string {
    return localStorage.getItem(COLONIA_D) || '';
  }

  public setColoniaDestino(coloniaOrigen: string) {
    localStorage.setItem(COLONIA_D, coloniaOrigen);
  }

  public getCalleDestino(): string {
    return localStorage.getItem(CALLE_D) || '';
  }

  public setCalleDestino(calleOrigen: string) {
    localStorage.setItem(CALLE_D, calleOrigen);
  }

  public getNumeroExtDestino(): string {
    return localStorage.getItem(NUMEROEXT_D) || '';
  }

  public setNumeroExtDestino(numeroExtDestino: string) {
    localStorage.setItem(NUMEROEXT_D, numeroExtDestino);
  }

  public getNumeroIntDestino() {
    return localStorage.getItem(NUMEROINT_D) || '';
  }

  public setNumeroIntDestino(numeroIntDestino: string) {
    localStorage.setItem(NUMEROINT_D, numeroIntDestino);
  }

  public getCiudadDestino(): string {
    return localStorage.getItem(CIUDAD_D) || '';
  }

  public setCiudadDestino(ciudad: string) {
    localStorage.setItem(CIUDAD_D, ciudad);
  }

  public getEstadoDestino(): string {
    return localStorage.getItem(ESTADO_D) || '';
  }

  public setEstadoDestino(estadoDestino: string) {
    localStorage.setItem(ESTADO_D, estadoDestino);
  }

  public getReferenciaDestino(): string {
    return localStorage.getItem(REFERENCIA_D) || '';
  }

  public setReferenciaDestino(referenciaDestino: string) {
    localStorage.setItem(REFERENCIA_D, referenciaDestino);
  }

  public getTelefono(): string {
    return localStorage.getItem(TELEFONO_D) || '';
  }

  public setTelefono(telefono: string) {
    localStorage.setItem(TELEFONO_D, telefono);
  }

  public getPais(): string {
    return localStorage.getItem(PAIS_D);
  }

  public setPais(pais: string) {
    localStorage.setItem(PAIS_D, pais);
  }

}
