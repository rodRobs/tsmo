import { CoberturaDto } from './../../models/dto/cobertura.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoberturaResponseModel } from 'src/app/models/response/cobertura-response.model';

const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
// const URL = 'http://localhost:8080/';
const COBERTURA = 'cobertura';
@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  constructor(
    private http: HttpClient
  ) { }

  cobertura(cobertura: CoberturaDto) {
    console.log(`${URL}${COBERTURA}`);
    return this.http.post<CoberturaResponseModel[]>(`${URL}${COBERTURA}`, cobertura);
  }
}
