export class DireccionDto {

    constructor(
        public cp: string,
        public colonia: string,
        public calle: string,
        public numeroInt: string,
        public numeroExt: string,
        public delegacion: string,
        public estado: string,
        public referencia: string
        ) {}
  }
