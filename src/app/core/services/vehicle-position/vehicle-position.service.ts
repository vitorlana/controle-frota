import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VehiclePosition } from '../../../shared/model/vehicle-position.model';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../app.constants';


@Injectable({
  providedIn: 'root'
})

export class VehiclePositionService {
  private VehiclePositionsSubject = new BehaviorSubject<VehiclePosition[]>([]);

  constructor(
    private constants: AppConstants,
    private http: HttpClient
  ) { }


  setVehiclePositions(points: VehiclePosition[]): void {
    this.VehiclePositionsSubject.next(points);
  }

  getVehiclePositionsv2(): Observable<VehiclePosition[]> {
    return this.VehiclePositionsSubject.asObservable();
  }

      
  getVehiclePositions(): Observable<VehiclePosition[]> {
    return this.http.get<VehiclePosition[]>(`${this.constants.API_ENDPOINT_BASE}${this.constants.API_ENDPOINT_VEHICLE_POSITION}`);
  }
  

}