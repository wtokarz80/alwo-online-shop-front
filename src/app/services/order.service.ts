import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {OrderStage} from '../models/orderStage';
import {LocalStorageService} from 'ngx-webstorage';
import {BasketProductDto} from '../models/basketProductDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderStage$ = new BehaviorSubject<OrderStage>({} as OrderStage);

  constructor(private localStorage: LocalStorageService) { }

  setState(orderStage: OrderStage): void {
    this.localStorage.clear('orderState');
    this.localStorage.store('orderState', orderStage);
    this.orderStage$.next(orderStage);
  }

  getStage(): Observable<OrderStage> {
    this.emitLocalStage();
    return this.orderStage$.asObservable();
  }

  private emitLocalStage(): void {
    const localStage = this.localStorage.retrieve('orderState');
    if (localStage) {
      this.orderStage$.next(localStage);
    } else {
      this.orderStage$.next({} as OrderStage);
    }
  }
}
