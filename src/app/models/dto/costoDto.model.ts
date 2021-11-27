import { CotizacionDto } from 'src/app/models/dto/cotizacionDto.model';
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
    public cotizacion: CotizacionDto,
    public realiza: string,
    public fcompromisoEntrega: string
  ) {}

}
