import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BasketStage} from '../models/orderStage';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private basketStage$ = new BehaviorSubject<BasketStage>({} as BasketStage);

  constructor() { }

  setState(basketStage: BasketStage): void {
    this.basketStage$.next(basketStage);
  }

  getStage(): Observable<BasketStage> {
    return this.basketStage$.asObservable();
  }
}
