import { ClienteDto } from './clienteDto.model';
import { DocumentacionDto } from './documentacionDto.model';

export class EnvioDto {

  constructor(
    public id: number,
    public guiaTsmo: string,
    public guiaProveedor: string,
    public documentacion: DocumentacionDto,
    public cliente: ClienteDto,
    public createAt: Date,
    public pago: string,
    public rastreos: string[]
  ) {}
}
