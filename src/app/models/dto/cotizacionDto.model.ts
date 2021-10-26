import { CostoDto } from 'src/app/models/dto/costoDto.model';
import { ServiciosDto } from 'src/app/models/dto/serviciosDto.model';
import { OpcionesDto } from './opcionesDto.model';
import { DetalleDto } from './detalleDto.model';
import { DestinoDto } from './destinoDto.model';
import { OrigenDto } from './origenDto.model';
export class CotizacionDto {

    constructor (
      public id: number,
      public cuenta: string,
      // Opciones
      public opciones: OpcionesDto,

      // Origen
      public origen: OrigenDto,
      // public cpOrigen: string,
      // public coloniaOrigen: string,
      // public calleOrigen: string,
      // public numeroExtOrigen: string,
      // public numeroIntOrigen: string,
      // public delegacionOrigen: string,
      // public ciudadOrigen: string,
      // public estadoOrigen: string,
      // public paisOrigen: string,
      // Destino
      public destino: DestinoDto,
      // public cpDestino: string,
      // public coloniaDestino: string,
      // public calleDestino: string,
      // public numeroExtDestino: string,
      // public numeroIntDestino: string,
      // public delegacionDestino: string,
      // public ciudadDestino: string,
      // public estadoDestino: string,
      // public paisDestino: string,
      // Detalle
      public detalle: DetalleDto[],
      public createAt: Date,
      // public largo: number,
      // public ancho: number,
      // public alto: number,
      // // Peso
      // public peso: number,
      // // Valor
      // public valor: number,
      // // Contenido
      // public contenido: string,
      // // Referencia
      // public referencia: string
      // public recoleccion: string
      public servicios: ServiciosDto[],
      public costo: CostoDto
    ) {}

  }
