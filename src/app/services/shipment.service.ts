import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Shipment} from '../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  public getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${environment.API_URL}/shipment-methods`);
  }
}
