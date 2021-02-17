import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {OrderStage} from '../models/orderStage';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderStage$ = new BehaviorSubject<OrderStage>({} as OrderStage);

  constructor() { }

  setState(orderStage: OrderStage): void {
    this.orderStage$.next(orderStage);
  }

  getStage(): Observable<OrderStage> {
    return this.orderStage$.asObservable();
  }
}
