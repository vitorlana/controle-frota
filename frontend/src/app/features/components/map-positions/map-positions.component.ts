import { Component, DestroyRef, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as L from 'leaflet';
import { combineLatest } from 'rxjs';
import { PointOfInterestService } from '../../../points-of-interest/points-of-interest.service';
import { PointOfInterest } from '../../../shared/model/point-of-interest.model';
import { VehiclePosition } from '../../../shared/model/vehicle-position.model';
import { VehiclePositionService } from '../../../vehicle-position/vehicle-postion.service';

L.Icon.Default.imagePath = 'assets/leaflet/';

interface PoiTimeResult {
  poiId: number;
  poiNome: string;
  vehicles: {
    placa: string;
    tempoTotal: number; // em minutos
  }[];
}

@Component({
  selector: 'app-map-positions',
  standalone: true,
  template: '<div id="map"></div>',
  styles: 'div { height: 50vh; width: 50vw; }'
})
export class MapPositionsComponent implements OnInit, AfterViewInit {
  @Output() poiTimeResults = new EventEmitter<PoiTimeResult[]>();

  private map!: L.Map;
  private poiMarkers: L.Circle[] = [];
  private vehicleRoute!: L.Polyline;
  private vehicleMarkers: L.Marker[] = [];

  private pointsOfInterest: PointOfInterest[] = [];
  private VehiclePositions: VehiclePosition[] = [];

  constructor(
    private poiService: PointOfInterestService,
    private vehicleService: VehiclePositionService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    combineLatest([
      this.poiService.getPointsOfInterest(),
      this.vehicleService.getVehiclePositions()
    ]).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(([pois, VehiclePositions]) => {
      this.pointsOfInterest = pois;
      this.VehiclePositions = VehiclePositions;
      this.updateMap();
    });
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private updateMap() {
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
    const routePoints = this.VehiclePositions.map(point => [point.latitude, point.longitude] as L.LatLngExpression);
    this.vehicleRoute = L.polyline(routePoints, { color: 'blue', weight: 3 });
  }

  private createVehicleMarkers() {
    this.vehicleMarkers = this.VehiclePositions.map(point => 
      L.marker([point.latitude, point.longitude])
        .bindPopup(`
          Placa: ${point.placa}<br>
          Data: ${point.data.toLocaleString()}<br>
          Velocidade: ${point.velocidade} km/h<br>
          Ignição: ${point.ignicao ? 'Ligada' : 'Desligada'}
        `)
    );
  }

  private addMarkersAndRoute() {
    this.poiMarkers.forEach(marker => marker.addTo(this.map));
    this.vehicleRoute.addTo(this.map);
    this.vehicleMarkers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
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
            lastEntryTime = point.data;
          } else if (!isInPoi && lastEntryTime) {
            timeInPoi += (point.data.getTime() - lastEntryTime.getTime()) / 60000; // Convert to minutes
            lastEntryTime = null;
          }

          // Check if it's the last point and still in POI
          if (i === points.length - 1 && lastEntryTime) {
            timeInPoi += (point.data.getTime() - lastEntryTime.getTime()) / 60000;
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
    return this.VehiclePositions.reduce((map, point) => {
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