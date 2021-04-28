import { Injectable } from '@angular/core';

const LARGO = 'largo';
const ANCHO = 'ancho';
const ALTO = 'alto';
const PESO = 'peso';
const VALOR = 'valor';
const CONTENIDO = 'contenido';
const TIPOENVIO = 'tipoEnvio';
const TIPOENTREGA = 'tipoEntrega';
const TIPOSERVICIO = 'tipoServicio';
@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor() { }

  getLargo(): string {
    return localStorage.getItem(LARGO) || '';
  }

  setLargo(largo: string) {
    localStorage.setItem(LARGO, largo);
  }

  getAncho(): string {
    return localStorage.getItem(ANCHO) || '';
  }

  setAncho(ancho: string) {
    localStorage.setItem(ANCHO, ancho);
  }

  getAlto(): string {
    return localStorage.getItem(ALTO) || '';
  }

  setAlto(alto: string) {
    localStorage.setItem(ALTO, alto);
  }

  getPeso(): string {
    return localStorage.getItem(PESO) || '';
  }

  setPeso(peso: string) {
    localStorage.setItem(PESO, peso);
  }

  getValor(): string {
    return localStorage.getItem(VALOR) || '';
  }

  setValor(valor: string) {
    localStorage.setItem(VALOR, valor);
  }

  getContenido(): string {
    return localStorage.getItem(CONTENIDO) || '';
  }

  setContenido(contenido: string) {
    localStorage.setItem(CONTENIDO, contenido);
  }

  getTipoEntrega(): string {
    return localStorage.getItem(TIPOENTREGA) || '';
  }

  setTipoEntrega(tipoEntrega: string) {
    localStorage.setItem(TIPOENTREGA, tipoEntrega);
  }

  getTipoEnvio(): string {
    return localStorage.getItem(TIPOENVIO) || '';
  }

  setTipoEnvio(tipoEnvio: string) {
    localStorage.setItem(TIPOENVIO, tipoEnvio);
  }

  getTipoServicio(): string {
    return localStorage.getItem(TIPOSERVICIO) || '';
  }

  setTipoServicio(tipoServicio: string) {
    localStorage.setItem(TIPOSERVICIO, tipoServicio);
  }

}
