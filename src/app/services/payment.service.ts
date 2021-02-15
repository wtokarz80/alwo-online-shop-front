import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {



  constructor(private http: HttpClient) { }

  public getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.API_URL}/payment-methods`);
  }
}
