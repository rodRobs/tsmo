export class CoberturaResponseModel {

  constructor(
    public clave: string,
    public isDomicilio: boolean,
    public isOcurre: boolean,
    public tipoServicio: string,
    public zona: string
  ) {}

}
