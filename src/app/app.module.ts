import { ComponentModule } from './components/component/component.module';
import { SharedModule } from './components/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { EnvioModule } from './components/inicio/envio/envio.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
// import { PesoComponent } from './components/inicio/cotizacion/peso/peso.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { MenuComponent } from './components/inicio/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ClientesComponent } from './components/inicio/clientes/clientes.component';
import { AltaClienteComponent } from './components/inicio/clientes/alta-cliente/alta-cliente.component';
import { ListarClienteComponent } from './components/inicio/clientes/listar-cliente/listar-cliente.component';
import { VerClienteComponent } from './components/inicio/clientes/ver-cliente/ver-cliente.component';
import { MenuClienteComponent } from './components/inicio/clientes/menu/menu.component';
import { CotizacionClientesComponent } from './components/cotizacion-clientes/cotizacion-clientes.component';
import { CostosClientesComponent } from './components/cotizacion-clientes/costos-clientes/costos-clientes.component';
import { PagoComponent } from './components/pago/pago.component';
import { AltaClientesComponent } from './components/alta-clientes/alta-clientes.component';
import { MenuPrincipalComponent } from './components/menu/menu.component';
import { CoberturaComponent } from './components/cobertura/cobertura.component';
import { RastreoComponent } from './components/rastreo/rastreo.component';
import { CancelacionComponent } from './components/cancelacion/cancelacion.component';

import { NgxStripeModule } from 'ngx-stripe';
import { ModalComponent } from './components/pago/modal/modal.component';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { DatosEnvioComponent } from './components/datos-envio/datos-envio.component';
import { DatosPedidoComponent } from './components/datos-pedido/datos-pedido.component';
import { ExitoComponent } from './components/exito/exito.component';
import { OperadorComponent } from './components/tsmo/operador/operador.component';
import { AltaEstatusEnvioComponent } from './components/tsmo/operador/alta-estatus-envio/alta-estatus-envio.component';
import { AltaUsuariosComponent } from './components/alta-usuarios/alta-usuarios.component';
import { MenuOperadorComponent } from './components/tsmo/operador/menu-operador/menu-operador.component';
import { BuscarGuiaComponent } from './components/tsmo/operador/alta-estatus-envio/buscar-guia/buscar-guia.component';
import { MostrarInformacionComponent } from './components/tsmo/operador/alta-estatus-envio/mostrar-informacion/mostrar-informacion.component';
import { ActualizarEnvioComponent } from './components/tsmo/operador/alta-estatus-envio/actualizar-envio/actualizar-envio.component';

import { MaterialModule } from './material.module';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { ProgressComponent } from './components/progress/progress.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { Error404Component } from './components/error404/error404.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { ListarEnviosComponent } from './components/listar-envios/listar-envios.component';
import { MostrarEnvioComponent } from './components/mostrar-envio/mostrar-envio.component';
import { ErrorComponent } from './components/error/error.component';
import { ContratarEnvioUsuarioComponent } from './components/contratar-envio-usuario/contratar-envio-usuario.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagosComponent } from './components/tsmo/pagos/pagos.component';
import { ActualizarPagoComponent } from './components/tsmo/pagos/actualizar-pago/actualizar-pago.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// QR
import { NgQrScannerModule } from 'angular2-qrscanner';
import { MapaComponent } from './components/mapa/mapa.component';
// import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    // PesoComponent,
    CotizacionComponent,
    MenuComponent,
    ClientesComponent,
    AltaClienteComponent,
    ListarClienteComponent,
    VerClienteComponent,
    MenuClienteComponent,
    CotizacionClientesComponent,
    CostosClientesComponent,
    PagoComponent,
    AltaClientesComponent,
    MenuPrincipalComponent,
    CoberturaComponent,
    RastreoComponent,
    CancelacionComponent,

    // LegendComponent,
    // ParrafoComponent,
    // InstruccionesComponent,

    ModalComponent,
    DatosEnvioComponent,
    DatosPedidoComponent,
    ExitoComponent,
    OperadorComponent,
    AltaEstatusEnvioComponent,
    AltaUsuariosComponent,
    MenuOperadorComponent,
    BuscarGuiaComponent,
    MostrarInformacionComponent,
    ActualizarEnvioComponent,
    // DashboardComponent,
    NavHeaderComponent,
    SidenavListComponent,
    RxjsComponent,
    ListarEnviosComponent,
    MostrarEnvioComponent,
    ErrorComponent,
    ContratarEnvioUsuarioComponent,
    PagosComponent,
    ActualizarPagoComponent,
    FooterComponent,
    MapaComponent

    // ProgressComponent,
    // GraphicsComponent,
    // Error404Component
  ],
  exports: [
    // LegendComponent,
    // ParrafoComponent,
    // InstruccionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51IS5riJLa9lV80PiOyf0DUlysyCAKq3LeslKCKdvKFBGC0JoVEeIgqLEU9BLE6nk5OFQ91Edh8BcOW0RNW1VdMFM009vSLUc79'),
    NgbModalModule,
    MaterialModule,
    EnvioModule,
    SharedModule,
    DashboardModule,
    ComponentModule,
    NgxPaginationModule,
    MatToolbarModule,
    NgQrScannerModule,
    MatProgressBarModule
    // NgxCurrencyModule
  ],
  providers: [

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CotizInterceptorService,
    //   multi: true // indica que se pueden usar varios interceptores
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
