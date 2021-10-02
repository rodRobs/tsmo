import { HostType } from 'src/app/enums/host.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ARCHIVO = 'archivo'
@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(
    private http: HttpClient
  ) { }

  guardarArchivo(formData: FormData) {
    return this.http.post(`${HostType.HOST}${ARCHIVO}/tsmo`, formData);
  }


}
