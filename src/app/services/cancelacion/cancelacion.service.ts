import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CancelacionDto } from 'src/app/models/dto/cancelacion.model';
import { PostCancelacionDto } from 'src/app/models/dto/postCancelacion.model';

const URL = 'http://localhost:8080/';
const CANCELACION = 'cancelacion';
@Injectable({
  providedIn: 'root'
})
export class CancelacionService {

  constructor(
    private http: HttpClient
  ) { }

  cancelacionGuia(postCancelacion: PostCancelacionDto) {
    return this.http.post<CancelacionDto>(`${URL}${CANCELACION}`, postCancelacion);
  }
}