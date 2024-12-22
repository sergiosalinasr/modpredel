import { Timestamp } from "rxjs";

export class Ley {
    id: number = 0;
    nombre: string;
    descripcion: string;
    fechapublicacion: string;
    pais: number;

    constructor(id: number, nombre: string, descripcion: string, fechapublicacion: string, pais: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechapublicacion = fechapublicacion;
        this.pais = pais;
      }
}
