import { Injectable } from '@angular/core';

const COSTO = 'costo';
@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  constructor() { }

  public getCosto(): string {
    return localStorage.getItem(COSTO) || '';
  }

  public setCosto(costo: string) {
    localStorage.setItem(COSTO, costo);
  }
}
