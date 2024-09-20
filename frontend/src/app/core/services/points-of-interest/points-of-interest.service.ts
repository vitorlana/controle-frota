import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PointOfInterest } from '../../../shared/model/point-of-interest.model';
import { AppConstants } from '../../../app.constants';
import { PoiTimeResult } from '../../../shared/model/poi-time-result.model';

@Injectable({
  providedIn: 'root'
})
export class PointOfInterestService {
  private pointsOfInterestSubject = new BehaviorSubject<PointOfInterest[]>([]);
  private poiTimeResultsSubject = new BehaviorSubject<PoiTimeResult[]>([]);
  pointsOfInterest$: Observable<PointOfInterest[]> = this.pointsOfInterestSubject.asObservable();
  poiTimeResults$: Observable<PoiTimeResult[]> = this.poiTimeResultsSubject.asObservable();

  
  constructor(
    private constants: AppConstants,
    private http: HttpClient
  ) { }



  setPoiTimeResults(results: PoiTimeResult[]) {
    this.poiTimeResultsSubject.next(results);
  }

  setPointsOfInterest(pois: PointOfInterest[]) {
    this.pointsOfInterestSubject.next(pois);
  }

  findNearestStreet(poi: PointOfInterest): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${poi.latitude}&lon=${poi.longitude}&zoom=18&addressdetails=1`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.address && data.address.road) {
          return data.address.road;
        } else {
          return 'Rua não encontrada';
        }
      })
      .catch(error => {
        console.error('Erro ao buscar a rua mais próxima:', error);
        return 'Erro ao buscar a rua';
      });
  }

  getPointsOfInterest(): Observable<PointOfInterest[]> {
    return this.http.get<PointOfInterest[]>(`${this.constants.API_ENDPOINT_BASE}${this.constants.API_ENDPOINT_POINTS_OF_INTEREST}`);
  }
  
}

