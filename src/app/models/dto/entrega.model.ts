export class EntregaDto {

  constructor(
    private id: number,
    private recibio: string,
    private parentesco: string,
    private fechaEntrega: Date,
    private longitud: string,
    private latitud: string,
    private identificacion: string
  ) {}

}
