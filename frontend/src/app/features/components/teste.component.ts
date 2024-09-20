import { Component } from "@angular/core";

import { VehiclePositionService } from "../../core/services/vehicle-position/vehicle-position.service";
import { MapPositionsComponent } from "../../features/components/map-positions/map-positions.component";
import { PoiTimeResult } from "../../shared/model/poi-time-result.model";
import { PointOfInterestService } from "../../core/services/points-of-interest/points-of-interest.service";
import { TableDataVehicleComponent } from "./table-data-vehicle/table-data-vehicle.component";


@Component({
    selector: 'app-some-component',
    standalone: true,
    imports: [MapPositionsComponent, TableDataVehicleComponent],
    template: `
      <app-map-positions (poiTimeResults)="handlePoiTimeResults($event)"></app-map-positions>
      <!-- <button (click)="updateMapData()">Atualizar Dados do Mapa</button> -->
    `
  })

  export class SomeComponent {
      constructor(private pointOfInterestService: PointOfInterestService) {}
    
      handlePoiTimeResults(results: PoiTimeResult[]) {
        this.pointOfInterestService.setPoiTimeResults(results);
        console.log('Resultados do tempo em POIs:', results);
      }
    }