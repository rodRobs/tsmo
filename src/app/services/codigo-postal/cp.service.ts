import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_CP = 'https://api.copomex.com/query/info_cp/';
const TOKEN = '3bdd101b-fa69-4ca2-b1c0-16cbbf051bdf';
@Injectable({
  providedIn: 'root'
})
export class CpService {

  constructor(
    private http: HttpClient
  ) { }

  consultarCP(cp: string) {
    return this.http.get<any>(`${URL_CP}${cp}?type=simplified&token=${TOKEN}`);
  }
}
