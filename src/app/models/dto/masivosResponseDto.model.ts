import { EnvioDto } from './EnvioDto.model';
export class MasivoResponseDtoModel {

  constructor(
    public exito: EnvioDto[],
    public sinCobertura: EnvioDto[],
    public error: EnvioDto[]
  ) {}

}
