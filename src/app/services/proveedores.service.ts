import { HostType } from 'src/app/enums/host.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedorDto } from '../models/dto/proveedor.model';

const PROVEEDORES = "proveedor";
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  host: string = HostType.HOST;

  constructor(
    private http: HttpClient
  ) { }

  existeNombre(nombre: string) {
    return this.http.get<boolean>(`${this.host}${PROVEEDORES}/existe/nombre/${nombre}`);
  }

  existeRfc(rfc: string) {
    return this.http.get<boolean>(`${this.host}${PROVEEDORES}/existe/rfc/${rfc}`);
  }

  guardar(proveedor: ProveedorDto) {
    return this.http.post<any>(`${this.host}${PROVEEDORES}`, proveedor);
  }

}
