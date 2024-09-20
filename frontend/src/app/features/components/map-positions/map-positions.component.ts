import { Component, DestroyRef, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as L from 'leaflet';
import { combineLatest } from 'rxjs';
import { PointOfInterest } from '../../../shared/model/point-of-interest.model';
import { VehiclePosition } from '../../../shared/model/vehicle-position.model';
import { VehiclePositionService } from '../../../core/services/vehicle-position/vehicle-position.service';
import { PoiTimeResult } from '../../../shared/model/poi-time-result.model';
import { PointOfInterestService } from '../../../core/services/points-of-interest/points-of-interest.service';
import { DatePipe } from '@angular/common';
import { FilterStateService } from '../../../core/services/filter/filter.service';

L.Icon.Default.imagePath = 'assets/leaflet/';

@Component({
  selector: 'app-map-positions',
  standalone: true,
  template: '<div #mapContainer id="map"></div>',
  styles: '#map { height: calc(0.80*100vh); width: 50vw; }',
})
export class MapPositionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @Output() poiTimeResults = new EventEmitter<PoiTimeResult[]>();

  private map: L.Map | null = null;
  private poiMarkers: L.Circle[] = [];
  private vehicleRoute: L.Polyline | null = null;
  private vehicleMarkers: L.Marker[] = [];

  private pointsOfInterest: PointOfInterest[] = [];
  private vehiclePositions: VehiclePosition[] = [];

  constructor(
    private poiService: PointOfInterestService,
    private vehicleService: VehiclePositionService,
    private filterStateService: FilterStateService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    combineLatest([
      this.poiService.getPointsOfInterest(),
      this.vehicleService.getVehiclePositions(),
      this.filterStateService.selectedDate$,
      this.filterStateService.selectedPlates$
    ]).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(([pois, vehiclePositions, selectedDate, selectedPlates]) => {
      this.pointsOfInterest = pois;
      this.vehiclePositions = this.filterVehiclePositions(vehiclePositions, selectedDate, selectedPlates);
      this.updateMap();
    });
  }

  private filterVehiclePositions(positions: VehiclePosition[], selectedDate: Date | null, selectedPlates: string[]): VehiclePosition[] {
    return positions.filter(position => {
      const positionDate = new Date(position.data);
      const dateMatches = !selectedDate || (
        positionDate.getFullYear() === selectedDate.getFullYear() &&
        positionDate.getMonth() === selectedDate.getMonth() &&
        positionDate.getDate() === selectedDate.getDate()
      );
      const plateMatches = selectedPlates.length === 0 || selectedPlates.includes(position.placa);
      return dateMatches && plateMatches;
    });
  }

  ngAfterViewInit() {
    try {
      this.initializeMap();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initializeMap() {
    if (this.map) {
      console.warn('Map already initialized');
      return;
    }

    const container = this.mapContainer.nativeElement;
    if (!container) {
      console.error('Map container not found');
      return;
    }

    try {
      const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      this.map = L.map(container).setView([0, 0], 2); // Set a default view
      L.tileLayer(baseMapURl).addTo(this.map);
      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Error creating map:', error);
    }
  }

  private updateMap() {
    if (!this.map) {
      console.warn('Map not initialized, cannot update');
      return;
    }
    this.clearMap();
    this.createPoiMarkers();
    this.createVehicleRoute();
    this.createVehicleMarkers();
    this.addMarkersAndRoute();
    this.centerMap();
    this.calculatePoiTimes();
  }

  private clearMap() {
    this.poiMarkers.forEach(marker => marker.remove());
    if (this.vehicleRoute) {
      this.vehicleRoute.remove();
    }
    this.vehicleMarkers.forEach(marker => marker.remove());
    this.poiMarkers = [];
    this.vehicleMarkers = [];
    this.vehicleRoute = null;
  }


  private createPoiMarkers() {
    this.poiMarkers = this.pointsOfInterest.map(poi => 
      L.circle([poi.latitude, poi.longitude], { 
        radius: poi.raio,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).bindPopup(`POI: ${poi.nome}`)
    );
  }

  private createVehicleRoute() {
    const routePoints = this.vehiclePositions.map(point => [point.latitude, point.longitude] as L.LatLngExpression);
    this.vehicleRoute = L.polyline(routePoints, { color: 'blue', weight: 3 });
  }

  private createVehicleMarkers() {
    this.vehicleMarkers = this.vehiclePositions.map(point => 
      L.marker([point.latitude, point.longitude], {} )
        .bindPopup(`
          Placa: ${point.placa}<br>
          Data: ${ point.data}<br>
          Velocidade: ${point.velocidade} km/h<br>
          Ignição: ${point.ignicao ? 'Ligada' : 'Desligada'}
        `)
    );
  }

  private addMarkersAndRoute() {
    if (!this.map) {
      console.error('Map is not initialized in addMarkersAndRoute');
      return;
    }
  
    try {
      this.poiMarkers.forEach(marker => marker.addTo(this.map!));
      
      if (this.vehicleRoute) {
        this.vehicleRoute.addTo(this.map);
      } else {
        console.warn('Vehicle route is not initialized');
      }
      
      this.vehicleMarkers.forEach(marker => marker.addTo(this.map!));
      
      console.log('Markers and route added successfully');
    } catch (error) {
      console.error('Error adding markers and route:', error);
    }
  }
  private centerMap() {
    if (!this.map) return;
    const allPoints = [
      ...this.poiMarkers.map(marker => marker.getLatLng()),
      ...this.vehicleMarkers.map(marker => marker.getLatLng())
    ];
    
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      this.map.fitBounds(bounds);
    }
  }

  private calculatePoiTimes() {
    const results: PoiTimeResult[] = this.pointsOfInterest.map(poi => ({
      poiId: poi.id,
      poiNome: poi.nome,
      vehicles: []
    }));

    const vehicleGroups = this.groupVehiclePositionByPlaca();

    vehicleGroups.forEach((points, placa) => {
      this.pointsOfInterest.forEach((poi, index) => {
        let timeInPoi = 0;
        let lastEntryTime: Date | null = null;

        points.forEach((point, i) => {
          const isInPoi = this.isPointInPoi(point, poi);
          
          if (isInPoi && !lastEntryTime) {
            lastEntryTime = new Date(point.data);
          } else if (!isInPoi && lastEntryTime) {
            timeInPoi += (new Date(point.data).getTime() - lastEntryTime.getTime()) / 60000; // Convert to minutes
            lastEntryTime = null;
          }

          // Check if it's the last point and still in POI
          if (i === points.length - 1 && lastEntryTime) {
            timeInPoi += (new Date(point.data).getTime() - lastEntryTime.getTime()) / 60000;
          }
        });

        if (timeInPoi > 0) {
          results[index].vehicles.push({
            placa: placa,
            tempoTotal: Math.round(timeInPoi)
          });
        }
      });
    });

    this.poiTimeResults.emit(results);
  }

  private groupVehiclePositionByPlaca(): Map<string, VehiclePosition[]> {
    return this.vehiclePositions.reduce((map, point) => {
      const group = map.get(point.placa) || [];
      group.push(point);
      map.set(point.placa, group);
      return map;
    }, new Map<string, VehiclePosition[]>());
  }

  private isPointInPoi(point: VehiclePosition, poi: PointOfInterest): boolean {
    const distance = this.calculateDistance(
      point.latitude, point.longitude,
      poi.latitude, poi.longitude
    );
    return distance <= poi.raio / 1000; // Convert radius to km
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}