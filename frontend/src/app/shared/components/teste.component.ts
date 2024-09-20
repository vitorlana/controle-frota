import { Component } from "@angular/core";
import { PointOfInterestService } from "../../points-of-interest/points-of-interest.service";
import { VehiclePositionService } from "../../vehicle-position/vehicle-position.service";
import { MapPositionsComponent } from "../../features/components/map-positions/map-positions.component";
import { PoiTimeResult } from "../model/poi-time-result.model";


@Component({
    selector: 'app-some-component',
    standalone: true,
    imports: [MapPositionsComponent],
    template: `
      <app-map-positions (poiTimeResults)="handlePoiTimeResults($event)"></app-map-positions>
      <button (click)="updateMapData()">Atualizar Dados do Mapa</button>
    `
  })

export class SomeComponent {
    constructor(
      private poiService: PointOfInterestService,
      private vehicleService: VehiclePositionService
    ) {}
  
    updateMapData() {
      // Exemplo de atualização dos dados
      this.poiService.setPointsOfInterest([
        { id: 1, nome: 'POI 1', latitude: -23.550, longitude: -46.633, raio: 1000 },
        // ... mais pontos de interesse
      ]);
  
      this.vehicleService.setVehiclePositions([
        { id: 1, placa: 'ABC1234', data: new Date(), velocidade: 60, latitude: -23.550, longitude: -46.633, ignicao: true },
        // ... mais pontos de veículo
      ]);
    }
  
    handlePoiTimeResults(results: PoiTimeResult[]) {
      console.log('Resultados do tempo em POIs:', results);
      // Faça o que for necessário com os resultados
    }
  }