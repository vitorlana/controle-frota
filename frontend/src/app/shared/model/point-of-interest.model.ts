export class PointOfInterest {

    id: number;
    nome: string;
    latitude: number;
    longitude: number;
    raio: number;

    
    constructor(id: number, nome: string , latitude: number, longitude: number, raio: number) {
    
        this.id = id;
        this.nome = nome;
        this.latitude = latitude;
        this.longitude = longitude;
        this.raio = raio;
    }
}