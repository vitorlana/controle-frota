export class PointOfInterest {

    id: number;
    nome: string;
    latitude: number;
    longitude: number;
    raio: number;
    nearestStreet?: string;

    
    constructor(id: number, nome: string , latitude: number, longitude: number, raio: number, nearestStreet?: string) {
    
        this.id = id;
        this.nome = nome;
        this.latitude = latitude;
        this.longitude = longitude;
        this.raio = raio;
        this.nearestStreet = nearestStreet;
    }
}