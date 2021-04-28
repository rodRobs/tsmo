import { Injectable } from "@angular/core";

const ID = 'id';
const CARGA = 'carga';
const FLETE = 'flete';
const RECOLECCION = 'recoleccion';
const DOMICILIO = 'domicilio';
const CXC = 'cxc';
const PRECIO = 'precio';
const UTILIDAD = 'utilidad';
const PESO = 'peso';

@Injectable({
    providedIn: 'root'
  })
  export class CargaService {

    constructor() { }

    public getId(): string {
        return localStorage.getItem(ID) || '0';
    }

    public setId(id: number) {
        localStorage.setItem(ID, id.toString());
    }

    public getCarga(): string {
        return localStorage.getItem(CARGA) || '0';
    }

    public setCarga(carga: number) {
        localStorage.setItem(CARGA, carga.toString());
    }

    public getFlete(): string {
        return localStorage.getItem(FLETE) || '0';
    }

    public setFlete(flete: number) {
        localStorage.setItem(FLETE, flete.toString());
    }

    public getRecoleccion(): string {
        return localStorage.getItem(RECOLECCION) || '0';
    }

    public setRecoleccion(recoleccion: number) {
        localStorage.setItem(RECOLECCION, recoleccion.toString());
    }

    public getDomicilio(): string {
        return localStorage.getItem(DOMICILIO) || '0';
    }

    public setDomicilio(domicilio: number) {
        localStorage.setItem(DOMICILIO, domicilio.toString())
    }

    public getCxc(): string {
        return localStorage.getItem(CXC) || '0';
    }

    public setCxc(cxc: number) {
        localStorage.setItem(CXC, cxc.toString());
    }

    public getPrecio(): string {
        return localStorage.getItem(PRECIO) || '0';
    }

    public setPrecio(precio: number) {
        localStorage.setItem(PRECIO, precio.toString());
    }

    public getUtilidad(): string {
        return localStorage.getItem(UTILIDAD) || '0';
    }

    public setUtilidad(utilidad: number) {
        localStorage.setItem(UTILIDAD, utilidad.toString());
    }

    public getPeso(): string {
        return localStorage.getItem(PESO) || '0';
    }

    public setPeso(peso: number) {
        localStorage.setItem(PESO, peso.toString());
    }

  }
