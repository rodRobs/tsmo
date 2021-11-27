import { CostoDto } from 'src/app/models/dto/costoDto.model';
export class CotizacionResponse {

  constructor(
    public costo: CostoDto,
    public cotizacion: number
  ) {}

}
