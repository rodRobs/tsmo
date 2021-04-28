export class JwtDTO {
    
    constructor (
        public token: string,
        public type: string, 
        public nombreUsuario: string,
        public authorities: string[]
        ) {}
        
}