import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VehiclePosition } from '../shared/model/vehicle-position.model';


@Injectable({
  providedIn: 'root'
})
export class VehiclePositionService {
  private VehiclePositionsSubject = new BehaviorSubject<VehiclePosition[]>([]);

  setVehiclePositions(points: VehiclePosition[]): void {
    this.VehiclePositionsSubject.next(points);
  }

  getVehiclePositions(): Observable<VehiclePosition[]> {
    return this.VehiclePositionsSubject.asObservable();
  }
}