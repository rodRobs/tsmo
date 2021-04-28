import { DimensionesDto } from "./dimensionesDto.model";

export class DetalleDto {

  constructor(
    public identificador: string,
    public contenido: string,
    public valorDeclarado: string,
    public dimensiones: DimensionesDto
  ) {}
}
