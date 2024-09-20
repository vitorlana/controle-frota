import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../app.constants';

@Injectable({
  providedIn: 'root'
})

export class LicensePlatesService {

  constructor(
    private constants: AppConstants,
    private http: HttpClient
  ) { }

  getLicensePlates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.constants.API_ENDPOINT_BASE}${this.constants.API_ENDPOINT_LICENSE_PLATE}`);
  }

}
