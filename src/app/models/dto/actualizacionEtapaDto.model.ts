export class ActualizacionEtapaDtoModel {

  constructor(
    public etapa: number,
    public latitud: string,
    public longitud: string,
    public guias: string[],
    public descripcion: string
  ) {}

}
