import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { PointOfInterestService } from '../../../core/services/points-of-interest/points-of-interest.service';
import { PoiTimeResult } from '../../../shared/model/poi-time-result.model';

interface FlattenedPoiTimeResult {
  poiId: number;
  poiNome: string;
  placa: string;
  tempoTotal: number;
}

@Component({
  selector: 'app-table-data-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, InputTextModule],
  templateUrl: './table-data-vehicle.component.html',
  styleUrl: './table-data-vehicle.component.css'
})
export class TableDataVehicleComponent implements OnInit, OnDestroy {
  flattenedResults: FlattenedPoiTimeResult[] = [];
  filteredResults: FlattenedPoiTimeResult[] = [];
  private subscription: Subscription | undefined;

  constructor(private pointOfInterestService: PointOfInterestService) {}

  ngOnInit() {
    this.subscription = this.pointOfInterestService.poiTimeResults$.subscribe((results: PoiTimeResult[]) => {
      this.flattenResults(results);
      this.filteredResults = this.flattenedResults;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private flattenResults(results: PoiTimeResult[]) {
    this.flattenedResults = results.flatMap(poi => 
      poi.vehicles.map((vehicle: { placa: any; tempoTotal: any; }) => ({
        poiId: poi.poiId,
        poiNome: poi.poiNome,
        placa: vehicle.placa,
        tempoTotal: vehicle.tempoTotal
      }))
    );
  }

  filterResults(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredResults = this.flattenedResults.filter(item => 
      item.poiNome.toLowerCase().includes(searchTerm) ||
      item.placa.toLowerCase().includes(searchTerm)
    );
  }
}