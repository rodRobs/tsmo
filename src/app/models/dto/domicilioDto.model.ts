export class DomicilioDto {

  constructor (
    public pais: string,
    public estado: string,
    public ciudad: string,
    public colonia: string,
    public codigoPostal: string,
    public calle: string,
    public numeroInt: string,
    public numeroExt: string
  ) {}

}
