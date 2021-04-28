export class TarjetaDto {
    constructor(
        public id: number,
        public numero: number,
        public fechaVigencia: string,
        public cvv: string
    ) {}
}