export class PoiTimeResult {
    poiId: number;
    poiNome: string;
    vehicles: {
      placa: string;
      tempoTotal: number; // em minutos
    }[];

    constructor(poiId: number, poiNome: string, vehicles: { placa: string; tempoTotal: number; }[]) {
        this.poiId = poiId;
        this.poiNome = poiNome;
        this.vehicles = vehicles;
    }
}