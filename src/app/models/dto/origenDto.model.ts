import { DomicilioDto } from "./domicilioDto.model";
import { TelefonosDto } from "./telefonosDto.model";

export class OrigenDto {

  constructor (
    public remitente: String,
    public domicilio: DomicilioDto,
    public telefonos: TelefonosDto[],
    public email: string,
    public referencia: string,
    public createAt: Date
  ) {}
}
