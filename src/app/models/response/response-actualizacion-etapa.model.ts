import { RastreoDto } from './../dto/rastreo.model';
import { EnvioDto } from './../dto/EnvioDto.model';
export class ResponseActualizacionEtapa {

  constructor(
    public enviosEncontrados: EnvioDto[],
    public enviosNoEncontrados: string[],
    public rastreosAlmacenados: RastreoDto[],
    public rastreosNoAlmacenados: RastreoDto[]
  ) {}

}
