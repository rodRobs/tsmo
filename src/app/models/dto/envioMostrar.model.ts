import { RastreoDto } from './rastreo.model';
import { ClienteDto } from './clienteDto.model';
import { DocumentacionEnvio } from "./documentacionEnvio.model";
import { EntregaDto } from './entrega.model';

export class EnvioMostrar {

  constructor(
    public id: number,
    public guiaTsmo: string,
    public guiaProveedor: string,
    public documentacion: DocumentacionEnvio,
    public cliente: ClienteDto,
    public createAt: Date,
    public estadoPago: string,
    public estadoEnvio: string,
    public pago: string,
    public entrega: EntregaDto,
    public rastreos: RastreoDto,
    public etapa: number
  ) {}

}
