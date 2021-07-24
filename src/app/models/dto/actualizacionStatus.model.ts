export class PostActualizacionStatusType {

  constructor(
    public etapa: string,
    public nombre: string,
    public descripcion: string,
    public listaGuias: string[],
    public municipio: string,
    public estado: string,
    public pais: string,
    public latitud: string,
    public longitud: string,
  ) {}

}
