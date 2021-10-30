import { DomicilioDto } from 'src/app/models/dto/domicilioDto.model';
import { EnvioDto } from './../../models/dto/EnvioDto.model';
import { ClienteDto } from 'src/app/models/dto/clienteDto.model';
import { DocumentacionDto } from 'src/app/models/dto/DocumentacionDto.model';
import { CostoDto } from 'src/app/models/dto/costoDto.model';
import { EnvioService } from './../../services/envio/envio.service';
import { CotizacionService } from 'src/app/services/cotizacion/cotizacion.service';
import { DocumentacionService } from './../../services/documentacion/documentacion.service';
import { Component, OnInit } from '@angular/core';
import { OpcionesDto } from 'src/app/models/dto/opcionesDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { OrigenDto } from 'src/app/models/dto/origenDto.model';
import { DestinoDto } from 'src/app/models/dto/destinoDto.model';

@Component({
  selector: 'app-contratar-envio-usuario',
  templateUrl: './contratar-envio-usuario.component.html',
  styleUrls: ['./contratar-envio-usuario.component.css']
})
export class ContratarEnvioUsuarioComponent implements OnInit {

  // Loading
  loading: boolean = true;

  costo: CostoDto = new CostoDto(null, '','','',null,null,null,null,null,null,null,null,null,null,null,null, null, null, null);
  documentacionDto: DocumentacionDto = new DocumentacionDto(null,'',new OpcionesDto('','','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], []);
  clienteDto: ClienteDto = new ClienteDto(null, null, null, null, null);
  envioDto: EnvioDto = new EnvioDto(null, null, null, new DocumentacionDto(null,'',new OpcionesDto('','','','',''), '','','ND',new OrigenDto('',new DomicilioDto('','','','','','','',''),[],'','', new Date()), new DestinoDto('','',new DomicilioDto('','','','','','','',''),[],'','', new Date()), [], []), new ClienteDto(null, null, null, null, null), null, null, null, new UsuarioModel(null, null, null, null, null, null));


  constructor(
    private documentacionService: DocumentacionService,
    private cotizacionService: CotizacionService,
    private envioService: EnvioService
  ) { }

  ngOnInit(): void {
  }

  // onCotizar() {
  //   this.cotizacionService.onSolicitarCotizacionEnvio(this.documentacionService.getCotizacionDto())
  //   .subscribe(costo => {
  //     document.getElementById('footer').style.position = 'relative';
  //     this.documentacionDto = this.documentacionService.getDocumentacion();
  //     // this.formulario = true;
  //     this.loading = false;
  //     this.costo = costo;
  //     this.precio = costo.costoTotal;
  //     // Request
  //     this.proveedor = costo.realiza;
  //     this.cotizacion = costo.cotizacion['id'];
  //     this.cotizacionService.setIdCotizacion(this.cotizacion.toString());
  //     // localStorage.setItem('cotizacion', costo.id.toString());
  //     // this.mostrarPrecio = true;
  //     // this.precioService.setCosto(carga.precio.toString());
  //     // this.precio = carga.precio;
  //     // console.log(costo);
  //   }, error => {
  //     this.loading = false;
  //     this.errorCotBool = true;
  //     this.errorCotizacion = (error['status'] === 500) ? 'ERROR: Servidor falló' : error['error'];

  //     // console.log(error);
  //   })
  // }

}
