import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {OrderStage} from '../models/orderStage';
import {LocalStorageService} from 'ngx-webstorage';
import {BasketProductDto} from '../models/basketProductDto';
import {BasketService} from './basket.service';
import {map, tap} from 'rxjs/operators';
import {OrderedProduct} from '../models/orderedProduct';
import {Order} from '../models/order';
import {Address} from '../models/address';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderStage$ = new BehaviorSubject<OrderStage>({} as OrderStage);
  private orderedProducts: OrderedProduct[] = [];

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

  // initOrder(): void {
  //   this.fillOrderedProducts();
  //   this.createOrderObject();
  // }

  public fillOrderedProducts(): void {
    this.basketService.getBasketProducts$().subscribe(
      (data: BasketProductDto[]) => {
        data.forEach( product => {
          const orderedProduct = new OrderedProduct(product.productId, product.quantity);
          this.orderedProducts.push(orderedProduct);
        });
      });
  }

  public createOrderObject(): Order {
    const order = new Order();
    order.addresses = this.orderStage$.value.addresses;
    order.orderedProducts = this.orderedProducts;
    order.paymentId = this.orderStage$.value.payment.id;
    order.shipmentId = this.orderStage$.value.shipment.id;
    return order;
  }

  public clearLocalStorage(): void {
    this.localStorage.clear('orderstate');
    this.basketService.removeAllFromBasket();
  }

  public postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:8080/alwo/orders', order)
      .pipe(tap(console.log));
  }

}
