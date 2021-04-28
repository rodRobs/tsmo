export class PaqueteDto {
    constructor(
        public largo: string,
        public ancho: string,
        public alto: string,
        public peso: string,
        public valor: string ,
        public contenido: string
    ) {}
}