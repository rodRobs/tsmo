import { CotizacionDto } from './cotizacionDto.model';
import { ServiciosDto } from './serviciosDto.model';
export class DocumentacionEnvio {

  constructor(
    public id: number,
    public referencia1: string,
    public referencia2: string,
    public contiene: string,
    public servicios: ServiciosDto,
    public cotizacion: CotizacionDto,
    public createAt: Date
  ) {}

}
