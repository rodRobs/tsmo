import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_CP = 'https://api-sepomex.hckdrk.mx/query/info_cp/';
@Injectable({
  providedIn: 'root'
})
export class CpService {

  constructor(
    private http: HttpClient
  ) { }

  consultarCP(cp: string) {
    return this.http.get<any>(`${URL_CP}${cp}?type=simplified&token=71e4bc57-3014-4bfe-8aa0-a21dab09704a`);
  }
}
