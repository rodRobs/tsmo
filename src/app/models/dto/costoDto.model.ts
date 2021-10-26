export class CostoDto {

  constructor(
    public id: number,
    public tipoGuia: string,
    public zona: string,
    public tipoServicio: string,
    public paquete: number,
    public peso: number,
    public pesoVolumetrico: number,
    public volumen: number,
    public flete: number,
    public combustible: number,
    public servicio: number,
    public subTotal: number,
    public iva: number,
    public total: number,
    public costoTotal: number,
    public moneda: string,
    public cotizacion: number,
    public realiza: string,
    public fcompromisoEntrega: string
  ) {}

}
