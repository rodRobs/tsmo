import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
// const URL = 'http://localhost:8080/';
const DOMICILIO = 'domicilio/';
const CIUDADES = 'ciudades';
@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  constructor(
    private http: HttpClient
  ) { }

  listarCiudadesEnvios() {
    return this.http.get<string[]>(`${URL}${DOMICILIO}${CIUDADES}`);
  }
}
