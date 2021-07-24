import { DireccionDto } from "./direccionDto.model";

export class ClienteDto {
    constructor(
        public id: number,
        public nombre: string,
        public correo: string,
        public telefono: string,
        public descuento: string
    ) {}
}
