import { GeocodeService } from './../../../../../services/google/geocode.service';
import { EnvioDto } from './../../../../../models/dto/EnvioDto.model';
import { EnvioService } from './../../../../../services/envio/envio.service';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';

// QR
import { QrScannerComponent } from 'angular2-qrscanner';
import { PostActualizacionStatusType } from 'src/app/models/dto/actualizacionStatus.model';

interface Rastreo{
  etapa: string,
  nombre: string,
  descripcion: string,
  listaGuias: string[],
  municipio: string,
  estado: string,
  pais: string,
  latitud: string,
  longitud: string,
}
@Component({
  selector: 'app-buscar-guia',
  templateUrl: './buscar-guia.component.html',
  styleUrls: ['./buscar-guia.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BuscarGuiaComponent implements OnInit {

  // QR Scanner
  @ViewChild(QrScannerComponent, { static : false }) qrScannerComponent: QrScannerComponent ;

  // Formulario
  forma: FormGroup;

  // Legenda
  legendaGuia: string = LegendaType.BuscarGuia;

  // Envio
  envio: EnvioMostrar;

  // Error
  error: string;
  errorBoolean: boolean = false;

  // Guia / Lista de guias
  guias: string = '';
  listaGuias: string[] = [];
  setGuias = new Set();

  // Contador
  contadorQR: number = 0;

  // Latitud, Longitud
  public lat;
  public lng;
  // Domicilio
  public municipio: string = '';
  public estado: string = '';
  public pais: string = '';
  // Descripcion, Etapa, Nombre
  public descripcion: string = '';
  public etapa: string = '';
  public nombre: string = '';

  // Output
  @Output () buscarEnvio = new EventEmitter<EnvioMostrar>();

  constructor(
    private fb: FormBuilder,
    private envioService: EnvioService,
    private geocodeService: GeocodeService
  ) {
    this.onCrearFormulario();
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('opcion'));
    document.getElementById('footer').style.position = 'relative';
    this.getLocalizacion();
  }

  onCrearFormulario() {
    this.forma = this.fb.group({
      guia: ['', Validators.required]
    })
  }

  get guiaNoValido() {return this.forma.get('guia').invalid && this.forma.get('guia').touched; }

  markTouched() {
    this.forma.get('guia').markAllAsTouched();
  }

  onSubmit() {
    if (this.forma.invalid) { this.markTouched(); return; }

    //this.getLocalizacion();
    console.log(this.lat);
    console.log(this.lng);
    console.log(this.guias);
    // this.actualizarStatus();
    /*this.envioService.buscarEnvioPorGuia(this.forma.get('guia').value)
    .subscribe(envio => {
      // console.log(envio);
      this.envio = envio;
      this.buscarEnvio.emit(this.envio);
      this.errorBoolean = false;
      document.getElementById('footer').style.position = 'relative';


    }, error => {
      this.buscarEnvio.emit(null);
      this.errorBoolean = true;
      this.error = error['error'];
    })
    */
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.qrScannerComponent.getMediaDevices().then(devices => {
      // console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
        // console.log(result);
        this.guias = `${this.guias}${result},\n`;
        this.listaGuias.push(result);
        this.contadorQR++;
        // console.log(this.guias);
        this.forma.get('guia').setValue(this.guias);
        this.setGuias.add(result);
        console.log(this.setGuias);
        console.log(this.setGuias.size);
        // console.log(this.listaGuias);
        // this.onSubmit();
    });
  }

  getLocalizacion() {
    // Obtener coordenadas
    if (navigator.geolocation) {
      console.log('Entra ');
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          // console.log("Latitude: " + position.coords.latitude +
            // "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getDatosGeolocazacion(this.lat, this.lng);
        }
      },
        (error: GeolocationPositionError) => console.log(error));
    }
  }

  getDatosGeolocazacion(lat, lng) {
    // Obtener datos de actualización
    this.geocodeService.obtenerDireccion(lat, lng)
    .subscribe(response => {
      this.municipio = response['results'][0]['address_components'][3]['long_name'];
      this.estado = response['results'][0]['address_components'][4]['long_name'];
      this.pais = response['results'][0]['address_components'][5]['long_name'];
    })
  }

  onActualizar() {
    // Entra a actualizar estado del envio
    console.log('Entra a actualizar estado del envio');
    if ( this.forma.invalid ) { this.markTouched(); return; }
    if (this.municipio == '' || this.estado == '' || this.pais == '') {
      alert('No se han cargado todos los datos de localización, Favor de reintentar');
      return;
    }
    let rastreo: Rastreo;
    // rastreo.
    // let postActualizacion: PostActualizacionStatusType = new PostActualizacionStatusType(
    //   null,null,null,null
    // );
  }

  /*
  verificarEtapa(etapa: number) {
    switch(etapa) {
      case 1: // Recolección
        this.nombre = 'RECOLECCIÓN';
        this.descripcion = '';
        break;
      case 2: // Almacen
        break;
      case 3: // Tránsito
        break;
      case 4: // Entregado
        break;
      case 5: // Entrega sin éxito
        break;
      case 6: // Devuelto
        break;
      case 7: // Cancelado
        break;
    }
  }
  */


}
