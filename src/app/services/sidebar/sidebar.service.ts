import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuEmpleados: any[] = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-file-chart',
      url: 'inicio'
    },
    {
      titulo: 'Realizar Envío',
      icono: 'mdi mdi-truck',
      url: 'envio'
    },
    {
      titulo: 'Cotizar',
      icono: 'mdi mdi-calculator',
      url: 'cotizacion'
    },
    {
      titulo: 'Rastreo de Envío',
      icono: 'mdi mdi-truck-delivery',
      url: 'rastrear'
    },
    {
      titulo: 'Cobertura',
      icono: 'mdi mdi-map-marker-circle',
      url: 'cobertura'
    },
    {
      titulo: 'Actualizar Estatus Envío',
      icono: 'mdi mdi-update',
      url: 'menu/status'
    },
    {
      titulo: 'Lista de Envios',
      icono: 'mdi mdi-view-list',
      url: 'envios'
    },
    {
      titulo: 'Cancelaciones',
      icono: 'mdi mdi-sim-alert',
      url: 'cancelacion'
    },
    {
      titulo: 'Actualizar Pago Envio',
      icono: 'mdi mdi-cash',
      url: 'pagos'
    }
    // {
    //   titulo: 'Cerrar Sesión',
    //   icono: 'mdi mdi-logout',
    //   url: '/login'
    // },

    /*,
    {
      titulo: 'RXJS',
      icono: 'mdi mdi-robot',
      url: 'rxjs'
    }*/
  ];

  menuClientes: any[] = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-file-chart',
      url: 'inicio'
    },
    {
      titulo: 'Realizar Envío',
      icono: 'mdi mdi-truck',
      url: 'envio'
    },
    {
      titulo: 'Cotizar',
      icono: 'mdi mdi-calculator',
      url: 'cotizacion'
    },
    {
      titulo: 'Rastreo de Envío',
      icono: 'mdi mdi-truck-delivery',
      url: 'rastrear'
    },
    {
      titulo: 'Cobertura',
      icono: 'mdi mdi-map-marker-circle',
      url: 'cobertura'
    },
    {
      titulo: 'Lista de Envios',
      icono: 'mdi mdi-view-list',
      url: 'envios'
    },
    {
      titulo: 'Cancelaciones',
      icono: 'mdi mdi-sim-alert',
      url: 'cancelacion'
    },
    // {
    //   titulo: 'Cerrar Sesión',
    //   icono: 'mdi mdi-logout',
    //   url: '/login'
    // },
  ]

  constructor() { }
}
