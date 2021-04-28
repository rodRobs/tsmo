import { Observable } from 'rxjs';
import { PaymentIntentDto } from './../../models/dto/paymentIntentDto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HEADERS = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
const URL = 'http://localhost:8080/stripe';
const PAYMENT = '/paymentIntent';
const CONFIRM = '/confirm/';
const CANCEL = '/cancel/';
@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(
    private http: HttpClient
  ) { }

  pagar(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.http.post<string>(`${URL}${PAYMENT}`, paymentIntentDto, HEADERS);
  }

  confirmar(id: string): Observable<string> {
    return this.http.post<string>(`${URL}${CONFIRM}${id}`, {}, HEADERS);
  }

  cancelar(id: string): Observable<string> {
    return this.http.post<string>(`${URL}${CANCEL}${id}`, {}, HEADERS);
  }
}
