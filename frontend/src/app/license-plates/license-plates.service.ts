import { LicensePlate } from './../shared/model/license-plate.model';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LicensePlatesService {

  constructor(
    private constants: AppConstants,
    private http: HttpClient
  ) { }

  getLicensePlates(): Observable<String[]> {
    return this.http.get<String[]>(`${this.constants.API_ENDPOINT_BASE}${this.constants.API_ENDPOINT_LICENSE_PLATE}`);
  }

}
