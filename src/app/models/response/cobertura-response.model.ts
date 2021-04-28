export class CoberturaResponseModel {

  constructor(
    public clave: string,
    public domicilio: boolean,
    public ocurre: boolean,
    public tipoServicio: string,
    public zona: string
  ) {}

}
