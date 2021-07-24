import { EnvioService } from './../../../../services/envio/envio.service';
import { RastreoDto } from './../../../../models/dto/rastreo.model';
import { RastreoService } from './../../../../services/rastreo/rastreo.service';
import { LegendaType } from './../../../../enums/legendas.enum';
import { EnvioMostrar } from './../../../../models/dto/envioMostrar.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actualizar-pago',
  templateUrl: './actualizar-pago.component.html',
  styleUrls: ['./actualizar-pago.component.css']
})
export class ActualizarPagoComponent implements OnInit {

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
  exito: string = 'Se ha actualizado el pago del envio correctamente';

  constructor(
    private fb: FormBuilder,
    private envioService: EnvioService
  ) {
    this.onCrearFormulario();
  }

  ngOnInit(): void {
    this.onMostrarEtapas();
  }

  onCrearFormulario() {
    this.forma = this.fb.group({
      edoPago: ['', Validators.required],
    })
  }

  onMostrarEtapas() {
    for (let index = 0; index < this.etapas.length; index++) {
      const etapa = this.etapas[index];
      if (index >= this.envio.etapa) {
        this.etapasSelect.push(etapa);
      }
    }
  }

  onSubmit() {

    if (this.forma.invalid) { this.markAllAsTouched(); return; }

    this.envioService.actualizarEstadoPagoTSMO(this.envio.id, this.forma.get('edoPago').value)
    .subscribe(envio => {
      this.desactivarBoton = true;
      this.exitoBoolean = true;
      this.errorBoolean = false;
      // console.log(rastreo);
    }, error => {
      this.desactivarBoton = false;
      this.exitoBoolean = false;
      this.errorBoolean = true;
    })
  }

  markAllAsTouched() {
    Object.values( this.forma.controls ).forEach(control => {
      control.markAllAsTouched();
    })
  }

}
