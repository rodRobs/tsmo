import { HostType } from 'src/app/enums/host.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasivoResponseDtoModel } from 'src/app/models/dto/masivosResponseDto.model';

const ARCHIVO = 'archivo'
@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(
    private http: HttpClient
  ) { }

  guardarArchivo(formData: FormData) {
    return this.http.post<MasivoResponseDtoModel>(`${HostType.HOST}${ARCHIVO}/tsmo`, formData);
  }


}
