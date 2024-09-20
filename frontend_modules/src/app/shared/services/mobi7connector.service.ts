import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Mobi7connectorService {

  constructor(private http: HttpClient) {
  }
}
