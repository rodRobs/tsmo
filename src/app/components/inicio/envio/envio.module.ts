import { RouterModule } from '@angular/router';
import { InstruccionesComponent } from './../../html/instrucciones/instrucciones.component';
import { ParrafoComponent } from './../../html/parrafo/parrafo.component';
import { LegendComponent } from './../../html/legend/legend.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvioComponent } from './envio.component';
import { PaqueteComponent } from './paquete/paquete.component';
import { OrigenComponent } from './origen/origen.component';
import { CostosComponent } from './costos/costos.component';
import { DestinoComponent } from './destino/destino.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DestinoComponent,
    CostosComponent,
    DestinoComponent,
    OrigenComponent,
    PaqueteComponent,
    EnvioComponent,
    LegendComponent,
    ParrafoComponent,
    InstruccionesComponent
  ],
  exports: [
    DestinoComponent,
    CostosComponent,
    DestinoComponent,
    OrigenComponent,
    PaqueteComponent,
    EnvioComponent,
    LegendComponent,
    ParrafoComponent,
    InstruccionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    // SharedModule
    // AppModule
  ]
})
export class EnvioModule { }
