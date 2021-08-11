import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostType } from 'src/app/enums/host.enum';
import { CancelacionDto } from 'src/app/models/dto/cancelacion.model';
import { PostCancelacionDto } from 'src/app/models/dto/postCancelacion.model';

// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
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
    return this.http.post<CancelacionDto>(`${HostType.HOST}${CANCELACION}`, postCancelacion);
  }
}
