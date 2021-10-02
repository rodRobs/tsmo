import { SubirExcelEnviosComponent } from './components/subir-excel-envios/subir-excel-envios.component';
import { ErrorComponent } from './components/error/error.component';
import { MostrarEnvioComponent } from './components/mostrar-envio/mostrar-envio.component';
import { ListarEnviosComponent } from './components/listar-envios/listar-envios.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { Error404Component } from './components/error404/error404.component';
import { ProgressComponent } from './components/progress/progress.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AltaEstatusEnvioComponent } from './components/tsmo/operador/alta-estatus-envio/alta-estatus-envio.component';
import { MenuOperadorComponent } from './components/tsmo/operador/menu-operador/menu-operador.component';
import { AltaUsuariosComponent } from './components/alta-usuarios/alta-usuarios.component';
import { OperadorComponent } from './components/tsmo/operador/operador.component';
import { ExitoComponent } from './components/exito/exito.component';
import { DatosPedidoComponent } from './components/datos-pedido/datos-pedido.component';
import { CancelacionComponent } from './components/cancelacion/cancelacion.component';
import { RastreoComponent } from './components/rastreo/rastreo.component';
import { CoberturaComponent } from './components/cobertura/cobertura.component';
import { PagoComponent } from './components/pago/pago.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { DestinoComponent } from './components/inicio/envio/destino/destino.component';
import { OrigenComponent } from './components/inicio/envio/origen/origen.component';
import { PaqueteComponent } from './components/inicio/envio/paquete/paquete.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MenuComponent } from './components/inicio/menu/menu.component';
import { CostosComponent } from './components/inicio/envio/costos/costos.component';
import { ClientesComponent } from './components/inicio/clientes/clientes.component';
import { ListarClienteComponent } from './components/inicio/clientes/listar-cliente/listar-cliente.component';
import { AltaClienteComponent } from './components/inicio/clientes/alta-cliente/alta-cliente.component';
import { VerClienteComponent } from './components/inicio/clientes/ver-cliente/ver-cliente.component';
import { CotizacionClientesComponent } from './components/cotizacion-clientes/cotizacion-clientes.component';
import { CostosClientesComponent } from './components/cotizacion-clientes/costos-clientes/costos-clientes.component';
import { EnvioComponent } from './components/inicio/envio/envio.component';
import { PagosComponent } from './components/tsmo/pagos/pagos.component';


// import { EnvioComponent } from './components/inicio/envio/envio.component';

const routes: Routes = [
  // Cotizacion clientes
  {path: 'envio', component: EnvioComponent,
  children: [
    {path: '', component: OrigenComponent},
    {path: 'destino', component: DestinoComponent},
    {path: 'paquete', component: PaqueteComponent},
    {path: 'costos', component: CostosClientesComponent},
    {path: 'resumen', component: DatosPedidoComponent},
    {path: 'pago', component: PagoComponent},
    {path: 'exito', component: ExitoComponent},
    {path: 'error', component:ErrorComponent}
  ]},
  {path: 'cliente', component: AltaClienteComponent},
  {path: 'pago', component: PagoComponent},
  {path: 'cobertura', component: CoberturaComponent},
  {path: 'rastrear', component: RastreoComponent},
  {path: 'cancelacion', component: CancelacionComponent},
  {path: 'cotizacion', component: CotizacionComponent},
  {path: 'alta/status/envio', component: AltaEstatusEnvioComponent},
  {path: '', component: CotizacionComponent},
  // Login
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent,
  children: [
    {path:'menu', component: MenuComponent},
    // Cotizacion
    {path:'', component: EnvioComponent,
    children: [
      {path:'envio', component: OrigenComponent},
      // {path:'cotizacion', component: OrigenComponent},
      {path:'destino', component: DestinoComponent},
      {path:'paquete', component: PaqueteComponent},
      {path:'cotizacion', component: CostosComponent},
      {path:'cliente', component: AltaClienteComponent},
      {path:'pago', component: PagoComponent}
    ]},
    // Clientes
    {path: 'clientes', component: ClientesComponent,
    children: [
      {path:'', component: ListarClienteComponent},
      {path:'alta', component: AltaClienteComponent},
      {path:'ver', component: VerClienteComponent}
    ]},
    // Operadores
    {path: 'status', component: AltaEstatusEnvioComponent}
  ]},
  {path: 'alta/usuario', component: AltaUsuariosComponent},
  {path: 'operador', component: OperadorComponent},
  {path: 'menu/operador', component: MenuOperadorComponent},
  {path: 'alta/status/envio', component: AltaEstatusEnvioComponent},
  {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' },
    children: [
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
      {path: 'inicio', component: GraphicsComponent, data: {titulo: 'Inicio'}},
      {path: 'cotizacion', component: CotizacionComponent, data: {titulo: 'Cotización'}},
      {path: 'envio', component: EnvioComponent, data: {titulo: 'Envio'},
      children: [
        {path: '', component: OrigenComponent, data: {titulo: 'Origen'}},
        {path: 'destino', component: DestinoComponent, data: {titulo: 'Destino'}},
        {path: 'paquete', component: PaqueteComponent, data: {titulo: 'Paquete'}},
        {path: 'costos', component: CostosClientesComponent, data: {titulo: 'Costos'}},
        {path: 'resumen', component: DatosPedidoComponent, data: {titulo: 'Datos del Pedido'}},
        {path: 'pago', component: PagoComponent, data: {titulo: 'Contratación'}},
        {path: 'exito', component: ExitoComponent, data: {titulo: ''}},
        {path: 'error', component: ErrorComponent, data: {titulo: ''}}
      ]},
      {path: 'alta/usuario', component: AltaUsuariosComponent, data: {titulo: 'Alta Usuario'}},
    {path: 'cobertura', component: CoberturaComponent, data: {titulo: 'Cobertura'}},
    {path: 'cancelacion', component: CancelacionComponent, data: {titulo: 'Cancelación'}},
    {path: 'rastrear', component: RastreoComponent, data: {titulo: 'Rastrear'}},
    {path: 'menu/status', component: MenuOperadorComponent, data: {titulo: 'Menu Actualización de Envío'}},
    {path: 'status', component: AltaEstatusEnvioComponent, data: {titulo: 'Actualizar Estatus Envío'}},
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}},
    {path: '*', component: Error404Component, data: {titulo: 'Error 404'}},
    {path: 'envios', component: ListarEnviosComponent, data: {titulo: 'Envios'}},
    {path: 'ver/envio', component: MostrarEnvioComponent, data: {titulo: 'Envio'}},
    {path: 'pagos', component: PagosComponent, data: {titulo: 'Actualizar Pago Envío'}}
    ]},
  {path: 'archivo', component: SubirExcelEnviosComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
