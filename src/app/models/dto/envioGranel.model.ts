import { EnvioDto } from './EnvioDto.model';
import { ClienteDto } from './clienteDto.model';
export class EnvioGranelDtoModel {

  constructor(
    public id: number,
    public cliente: ClienteDto,
    public nombre: string,
    public totalPaquetes: number,
    public entregados: number,
    public estado: string,
    public createAt: Date,
    public envios: EnvioDto[],

  ) {}

}
