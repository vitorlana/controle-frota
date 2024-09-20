import { PointOfInterest } from './../shared/model/point-of-interest.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PointOfInterestService {
  private pointsOfInterestSubject = new BehaviorSubject<PointOfInterest[]>([]);
  
  constructor(
    private constants: AppConstants,
    private http: HttpClient
  ) { }

  setPointsOfInterest(points: PointOfInterest[]): void {
    this.pointsOfInterestSubject.next(points);
  }

  getPointsOfInterestv2(): Observable<PointOfInterest[]> {
    return this.pointsOfInterestSubject.asObservable();
  }
    
  getPointsOfInterest(): Observable<PointOfInterest[]> {
    return this.http.get<PointOfInterest[]>(`${this.constants.API_ENDPOINT_BASE}${this.constants.API_ENDPOINT_POINTS_OF_INTEREST}`);
  }
  
}

