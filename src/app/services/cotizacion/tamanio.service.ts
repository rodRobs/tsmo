import { Injectable } from '@angular/core';

const LARGO = 'largo';
const ANCHO = 'ancho';
const ALTO = 'alto';

@Injectable({
  providedIn: 'root'
})
export class TamanioService {

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
  
}
