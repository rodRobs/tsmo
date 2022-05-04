import { EnvioDto } from './EnvioDto.model';
export class RastreoDto {

constructor(
  public id: number,
  public etapa: number,
  public nombre: string,
  public descripcion: string,
  public ubicacion: string,
  public latitud: string,
  public longitud: string,
  public createAt: Date,
  public envio: EnvioDto,
  public guia: string
) {}

}
