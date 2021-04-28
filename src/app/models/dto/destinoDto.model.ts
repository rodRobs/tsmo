import { DomicilioDto } from "./domicilioDto.model";
import { TelefonosDto } from "./telefonosDto.model";

export class DestinoDto {

  constructor(
    public destinatario: string,
    public destinatario2: string,
    public domicilio: DomicilioDto,
    public telefonos: TelefonosDto[],
    public email: string,
    public referencia: string,
    public createAt: Date
  ) {}

}
