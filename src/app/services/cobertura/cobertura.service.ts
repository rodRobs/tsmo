import { CoberturaDto } from './../../models/dto/cobertura.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoberturaResponseModel } from 'src/app/models/response/cobertura-response.model';

const URL = 'http://localhost:8080/cobertura';
@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  constructor(
    private http: HttpClient
  ) { }

  cobertura(cobertura: CoberturaDto) {
    return this.http.post<CoberturaResponseModel[]>(URL, cobertura);
  }
}
