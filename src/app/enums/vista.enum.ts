export enum Vista {
    LOGIN = 'login',
    // PUBLICO GENERAL
    INICIO = '',
    ORIGEN = 'envio',
    DESTINO = 'envio/destino',
    PAQUETE = 'envio/paquete',
    COTIZACION = 'cotizacion',
    RASTREO = 'rastreo',
    COBERTURA = 'cobertura',
    CANCELACION = 'cancelacion',
    //
    ORIGEN_CLIENTE = "envio",
    DESTINO_CLIENTE = "envio/destino",
    PAQUETE_CLIENTE = "envio/paquete",
    COSTOS_CLIENTE = "envio/costos",
    ALTA_CLIENTE = "cliente",
    PAGO_CLIENTE = "envio/pago",
    EXITO = 'envio/exito',
    ERROR = 'envio/error',
    // DASHBOARD
    INICIO_DASHBOARD = 'dashboard/inicio',
    // Envio
    ORIGEN_DASHBOARD = 'dashboard/envio',
    DESTINO_DASHBOARD = 'dashboard/envio/destino',
    PAQUETE_DASHBOARD = 'dashboard/envio/paquete',
    PAGO_DASHBOARD = 'dashboard/envio/pago',
    EXITO_DASHBOARD = 'dashboard/envio/exito',
    ERROR_DASHBOARD = 'dashboard/envio/error',
    // Cotizacion
    COTIZACION_DASHBOARD = 'dashboard/cotizacion',
    COBERTURA_DASHBOARD = 'dashboard/cobertura',
    CANCELACION_DASHBOARD = 'dashboard/cancelacion',
    RASTREAR_DASHBOARD = 'dashboard/rastrear',
    STATUS_DASHBOARD = 'dashboard/status'


}
