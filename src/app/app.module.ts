import { ValidadoresService } from './services/validadores/validadores.service';
import { NotificacionService } from './services/notifacion/notificacion.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvioService } from './services/envio/envio.service';
import { ClienteService } from './services/clientes/cliente.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DestinoComponent } from './components/inicio/envio/destino/destino.component';
// import { PesoComponent } from './components/inicio/cotizacion/peso/peso.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { MenuComponent } from './components/inicio/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/usuarios/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrigenService } from './services/cotizacion/origen.service';
import { OrigenComponent } from './components/inicio/envio/origen/origen.component';
import { DestinoService } from './services/cotizacion/destino.service';
import { TamanioService } from './services/cotizacion/tamanio.service';
import { PesoService } from './services/cotizacion/peso.service';
import { CotizInterceptorService } from './interceptors/cotiz-interceptor.service';
import { PaqueteComponent } from './components/inicio/envio/paquete/paquete.component';
import { PaqueteService } from './services/cotizacion/paquete.service';
import { CostosComponent } from './components/inicio/envio/costos/costos.component';
import { CargaService } from './services/cotizacion/carga.service';
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
import { LegendComponent } from './components/html/legend/legend.component';
import { EnvioComponent } from './components/inicio/envio/envio.component';
import { ParrafoComponent } from './components/html/parrafo/parrafo.component';
import { InstruccionesComponent } from './components/html/instrucciones/instrucciones.component';
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
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { ProgressComponent } from './components/progress/progress.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { Error404Component } from './components/error404/error404.component';
// import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    DestinoComponent,
    // PesoComponent,
    CotizacionComponent,
    EnvioComponent,
    MenuComponent,
    OrigenComponent,
    PaqueteComponent,
    CostosComponent,
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
    LegendComponent,
    ParrafoComponent,
    InstruccionesComponent,
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
    DashboardComponent,
    NavHeaderComponent,
    SidenavListComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ProgressComponent,
    GraphicsComponent,
    Error404Component
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
    MaterialModule
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
