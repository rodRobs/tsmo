import { EnvioDto } from './EnvioDto.model';
export class CancelacionDto {

  constructor(
    public id: number,
    public comentario: string,
    public mensaje: string,
    public envio: EnvioDto
  ) {}

}
