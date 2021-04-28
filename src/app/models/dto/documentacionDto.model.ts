import { DestinoDto } from "./destinoDto.model";
import { DetalleDto } from "./detalleDto.model";
import { OpcionesDto } from "./opcionesDto.model";
import { OrigenDto } from "./origenDto.model";
import { ServiciosDto } from "./serviciosDto.model";

export class DocumentacionDto {

  constructor(
    public id: number,
    public cuenta: string,
    public opciones: OpcionesDto,
    public referencia1: string,
    public referencia2: string,
    public contiene: string,
    public origen: OrigenDto,
    public destino: DestinoDto,
    public detalle: DetalleDto[],
    public servicios: ServiciosDto
  ) {}

}
