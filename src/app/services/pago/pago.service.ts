import { Observable } from 'rxjs';
import { PaymentIntentDto } from './../../models/dto/paymentIntentDto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostType } from 'src/app/enums/host.enum';

const HEADERS = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
const URL = 'http://localhost:8080/';
const STRIPE = 'stripe/'
const PAYMENT = 'paymentIntent';
const CONFIRM = 'confirm/';
const CANCEL = 'cancel/';
@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(
    private http: HttpClient
  ) { }

  pagar(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.http.post<string>(`${HostType.HOST}${STRIPE}${PAYMENT}`, paymentIntentDto, HEADERS);
  }

  confirmar(id: string): Observable<string> {
    return this.http.post<string>(`${HostType.HOST}${STRIPE}${CONFIRM}${id}`, {}, HEADERS);
  }

  cancelar(id: string): Observable<string> {
    return this.http.post<string>(`${HostType.HOST}${STRIPE}${CANCEL}${id}`, {}, HEADERS);
  }
}
