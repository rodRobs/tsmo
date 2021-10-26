import { CoberturaDto } from './../../models/dto/cobertura.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoberturaResponseModel } from 'src/app/models/response/cobertura-response.model';
import { HostType } from 'src/app/enums/host.enum';

// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
// const URL = 'http://localhost:8080/';
const COBERTURA = 'cobertura';
const CP = '/cp';
@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  constructor(
    private http: HttpClient
  ) { }

  cobertura(cobertura: CoberturaDto) {
    console.log(`${HostType.HOST}${COBERTURA}`);
    return this.http.post<CoberturaResponseModel[]>(`${HostType.HOST}${COBERTURA}`, cobertura);
  }

  validarCobertura(codigoPostal: string) {
    if (codigoPostal.length == 5)
      return this.http.post<boolean>(`${HostType.HOST}${COBERTURA}${CP}`, codigoPostal);
  }

}
