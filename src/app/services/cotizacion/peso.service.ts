import { Injectable } from '@angular/core';

const PESO = 'peso';

@Injectable({
  providedIn: 'root'
})
export class PesoService {

  constructor() { }

  getPeso(): string {
    return localStorage.getItem(PESO) || '';
  }

  setPeso(peso: string) {
    localStorage.setItem(PESO, peso);
  }
  
}
