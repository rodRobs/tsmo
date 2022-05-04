export class ProveedorDto {

  constructor(
    public id: number,
    public nombre: string,
    public createAt: any,
    public rfc: string,
    public numeroCuenta: string,
    public banco: string,
    public telefono: string,
    public correo: string,
    public nombreAsesor: string,
    public direccion: string,
    public modificateAt: any,
    public usuario: any
  ) {}

}
