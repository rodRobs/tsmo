import { RastreoDto } from 'src/app/models/dto/rastreo.model';
import { EnvioDto } from './../dto/EnvioDto.model';
export class ResponseActualizacionEtapaModel {

  constructor(
    public enviosEncontrados: EnvioDto[],
    public enviosNoEncontrados: string[],
    public rastreosAlmacenados: RastreoDto[],
    public rastreosNoAlmacenados: RastreoDto[]
  ) {}

}
