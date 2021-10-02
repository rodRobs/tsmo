import { Observable } from 'rxjs';
import { CotizacionDto } from 'src/app/models/dto/cotizacionDto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentacionDto } from 'src/app/models/dto/DocumentacionDto.model';
import { DestinoDto } from 'src/app/models/dto/destinoDto.model';
import { DomicilioDto } from 'src/app/models/dto/domicilioDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { OpcionesDto } from 'src/app/models/dto/opcionesDto.model';
import { DetalleDto } from 'src/app/models/dto/detalleDto.model';
import { DimensionesDto } from 'src/app/models/dto/dimensionesDto.model';
import { HostType } from 'src/app/enums/host.enum';

// const URL = 'http://189.226.231.80:8082/crud-0.0.1-SNAPSHOT/';
const URL = 'http://localhost:8080/';
const DOCUMENTACION_URL = 'documentacion';
const COTIZACION = 'cotizacionDto';
const DOCUMENTACION = 'documentacionDto';
@Injectable({
  providedIn: 'root'
})
export class DocumentacionService {

  constructor(
    private http: HttpClient
  ) { }

  guardarPreDocumentacion(pre_doc: DocumentacionDto, proveedor: string, cotizacion: number) {
    return this.http.post<DocumentacionDto>(`${HostType.HOST}${DOCUMENTACION_URL}/${proveedor}/${cotizacion}`, pre_doc);
  }

  getCotizacionDto(): CotizacionDto {
    let cotizacion: CotizacionDto = JSON.parse(localStorage.getItem(COTIZACION));
    return cotizacion || new CotizacionDto(0,'',new OpcionesDto('','','','',''),new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','',new Date()),new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','',new Date()),[], new Date(),[]);
  }

  setCotizacionDto(cotizacion: CotizacionDto) {
    localStorage.setItem(COTIZACION, JSON.stringify(cotizacion));
  }

  getDocumentacion(): DocumentacionDto {
    let documentacion: DocumentacionDto = JSON.parse(localStorage.getItem(DOCUMENTACION));
    return documentacion || new DocumentacionDto(null,'',new OpcionesDto('','','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], []);
  }

  setDocumentacion(documentacion: DocumentacionDto) {
    localStorage.setItem(DOCUMENTACION, JSON.stringify(documentacion));
  }

  obtenerGuiaProveedor(documentacion: DocumentacionDto): Observable<string> {
    return this.http.post<string>(`${HostType.HOST}${DOCUMENTACION_URL}/proveedor`, documentacion);
  }
}
