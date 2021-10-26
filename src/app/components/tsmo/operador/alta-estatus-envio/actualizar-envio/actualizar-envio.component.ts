import { RastreoService } from './../../../../../services/rastreo/rastreo.service';
import { RastreoDto } from 'src/app/models/dto/rastreo.model';
import { EnvioMostrar } from 'src/app/models/dto/envioMostrar.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegendaType } from 'src/app/enums/legendas.enum';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actualizar-envio',
  templateUrl: './actualizar-envio.component.html',
  styleUrls: ['./actualizar-envio.component.css']
})
export class ActualizarEnvioComponent implements OnInit {

  // Formulario
  forma: FormGroup;

  // Latitud, Longitud
  public lat;
  public lng;

  @Input () envio: EnvioMostrar;

  legendaActualizar: string = LegendaType.ActualizacionEnvio;

  // Etapas
  etapas: string[] = ['Recolección', 'Almacén', 'En Tránsito', 'Entregado'];
  etapasSelect: string[] = [];

  // Descripciones
  descripcionRecoleccion: string[] = ['En camino a Recolección', 'Recolectado'];
  descripcionAlmacen: string[] = ['Llego al almacén','Salió del almacén'];
  descripcionTransito: string[] = ['En camino a destino para su entrega'];
  descripcionEntregado: string[] = ['Se entregó el paquete'];
  // Mostrar
  descripcionMostrar: string[] = [];

  // Boton
  desactivarBoton: boolean = false;

  // Error
  errorBoolean: boolean = false;
  error: string = '';

  // Exito
  exitoBoolean: boolean = false;
  exito: string = 'Se ha actualizado el status del envío correctamente';

  constructor(
    private fb: FormBuilder,
    private rastreoService: RastreoService
  ) {
    this.onCrearFormulario();
  }

  ngOnInit(): void {
    // this.getLocalizacion();
    this.onMostrarEtapas();
    document.getElementById('footer').style.position = "relative";
  }

  onCrearFormulario() {
    this.forma = this.fb.group({
      etapa: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  getLocalizacion() {
    // Obtener coordenadas
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          // console.log("Latitude: " + position.coords.latitude +
            // "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      },
        (error: GeolocationPositionError) => console.log(error));
    } else {

    }
  }

  onMostrarEtapas() {
    for (let index = 0; index < this.etapas.length; index++) {
      const etapa = this.etapas[index];
      if (index >= this.envio.etapa) {
        this.etapasSelect.push(etapa);
      }
    }
  }

  onSeleccionDescripcion() {
    this.desactivarBoton = false;
    switch(this.forma.get('etapa').value) {
      case '0': // Recoleccion
        this.descripcionMostrar = this.descripcionRecoleccion;
        break;
      case '1': // Almacen
        this.descripcionMostrar = this.descripcionAlmacen;
        break;
      case '2': // En Transito
        this.descripcionMostrar = this.descripcionTransito;
        break;
      case '3': // Entregado
        this.descripcionMostrar = this.descripcionEntregado;
        break;
    }
  }

  onSubmit() {
    // console.log("Entra a actualizar status del envio");
    // console.log(this.forma);
    if (this.forma.invalid) { this.markAllAsTouched(); return; }
    this.rastreoService.onActualizarRastreo(this.envio.id, this.asignarValores())
    .subscribe(rastreo => {
      this.desactivarBoton = true;
      this.exitoBoolean = true;
      // console.log(rastreo);
    }, error => {
      this.desactivarBoton = false;
      this.exitoBoolean = false;
    })
  }

  markAllAsTouched() {
    Object.values( this.forma.controls ).forEach(control => {
      control.markAllAsTouched();
    })
  }

  asignarValores() {
    return new RastreoDto(
      null,
      this.forma.get('etapa').value,
      this.etapas[this.forma.get('etapa').value],
      this.forma.get('descripcion').value,
      null,
      this.lat,
      this.lng,
      null,
      null
    );
  }

}
