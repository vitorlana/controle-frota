import { Component, DestroyRef, Input } from '@angular/core';
import * as L from 'leaflet';

L.Icon.Default.imagePath = 'assets/leaflet/';

@Component({
  selector: 'app-map',
  standalone: true,
  template: '<div [id]="this.id.toString()" ></div>',
  styles: 'div { height: 50vh; width: 50vw; }'
})

export class MapComponent {

  @Input({required: true} ) id !: number;
  @Input({required: true} ) latitude !: number;
  @Input({required: true} ) longitude !: number;
  @Input({required: true} ) radius !: number;


  private map!: L.Map;
  markers: L.Circle[] = [];

  constructor(
    private destroyRef: DestroyRef) {
      destroyRef.onDestroy(() => {
        console.log('UserProfile destruction');
      });
     }

  ngOnInit() {
    this.markers.push(L.circle({lat: this.latitude, lng: this.longitude}, {radius: this.radius})); ;
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }


  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map(this.id.toString()) ;
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private addMarkers() {
    // Add your markers to the map
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }

  private disableMap() {
    console.log("after render");
  }
}


