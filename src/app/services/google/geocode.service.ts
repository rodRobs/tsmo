import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleResult } from 'src/app/models/interfaces/googleResult.interface';

const URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const KEY = '&key=AIzaSyCSoaSUrUk2c_MDB_kP4bCVwG3WK6zyLTo';
@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerDireccion(lat: string, lng: string) {
    return this.http.get<GoogleResult>(`${URL}latlng=${lat},${lng}${KEY}`);
  }
}
