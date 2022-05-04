export class OpcionesDto {

  constructor (
    public tipoEnvio: string,
    public tipoEntrega: string,
    public tipoServicio: string,
    public tipoCobro: string,
    public tipoRecoleccion: string,
    public paqueteriaRealiza: string
  ) {}

}
