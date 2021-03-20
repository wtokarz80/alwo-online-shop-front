import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {OrderStage} from '../models/orderStage';
import {LocalStorageService} from 'ngx-webstorage';
import {BasketService} from './basket.service';
import {tap} from 'rxjs/operators';
import {OrderData} from '../models/orderData';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category';
import {environment} from '../../environments/environment';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderStage$ = new BehaviorSubject<OrderStage>({} as OrderStage);

  constructor(private localStorage: LocalStorageService,
              private basketService: BasketService,
              public http: HttpClient) { }

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

  public clearLocalStorage(): void {
    this.localStorage.clear('orderstate');
    this.basketService.removeAllFromBasket();
  }

  public postOrder(order: OrderData): Observable<OrderData> {
    return this.http.post<OrderData>('http://localhost:8080/alwo/orders', order)
      .pipe(tap(console.log));
  }

  public getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.API_URL}/orders`);
  }
}
