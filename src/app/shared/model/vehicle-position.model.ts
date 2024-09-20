import { DatePipe } from "@angular/common";

export class VehiclePosition {

    id: number;
    placa: string;
    data: string;
    velocidade: number;
    latitude: number;
    longitude: number;
    ignicao: Boolean;

    
    constructor(id: number, placa: string, data: string, velocidade: number, latitude: number, longitude: number, ignicao: Boolean) {
    
        this.id = id;
        this.placa = placa;
        this.data = data;
        this.velocidade = velocidade;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ignicao = ignicao;
    }
}