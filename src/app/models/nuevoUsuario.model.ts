export class UsuarioNuevoModel {

  constructor(
    public id: number,
    public nombre: string,
    public nombreUsuario: string,
    public email: string,
    public password: string,
    public roles: string[]
  ) {}

}
