import { Injectable } from '@angular/core';
import {BasketProductDto} from '../models/basketProductDto';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class LocalBasketService {

  private store$ = new BehaviorSubject<BasketProductDto[]>([]);

  constructor(private localStorage: LocalStorageService) { }

  public getBasketProducts$(): Observable<BasketProductDto[]> {
    this.emitLocalBasket();
    return this.store$.asObservable();
  }

  private emitLocalBasket(): void {
    const localBasket = this.localStorage.retrieve('basket');
    if (localBasket) {
      this.store$.next(localBasket);
    } else {
      this.store$.next([]);
    }
  }

  public addProductToLocalBasket(basketProductDto: BasketProductDto): void {
    let localBasket = this.localStorage.retrieve('basket');
    const ids = [];
    if (localBasket !== null) {
      for (const product of localBasket) {
        ids.push(product.productId);
      }
      if (!ids.includes(basketProductDto.productId)) {
        localBasket.push(basketProductDto);
      }
      else {
        for (let i = 0; i < localBasket.length; i++) {
          if (localBasket[i].productId === basketProductDto.productId) {
            localBasket[i].quantity = (this.checkAmount(localBasket[i], basketProductDto))
              ? (localBasket[i].quantity + basketProductDto.quantity) : basketProductDto.stock;
          }
        }
      }
      this.localStorage.clear('basket');
      this.localStorage.store('basket', localBasket);
    } else {
      localBasket = [];
      localBasket.push(basketProductDto);
      this.localStorage.clear('basket');
      this.localStorage.store('basket', localBasket);
    }
    this.emitLocalBasket();
  }

  private checkAmount(localBasketProduct: BasketProductDto, chosenProduct: BasketProductDto): boolean {
    return  (localBasketProduct.quantity + chosenProduct.quantity) <= chosenProduct.stock;
  }


  public updateBasketProduct(basketProductDto: BasketProductDto): void {
    const localBasket = this.localStorage.retrieve('basket');
    if (localBasket && basketProductDto !== null) {
      for (let i = 0; i < localBasket.length; i++) {
        if (localBasket[i].productId === basketProductDto.productId && basketProductDto.quantity > 0) {
          localBasket[i].quantity = (basketProductDto.quantity <= basketProductDto.stock)
            ? basketProductDto.quantity : basketProductDto.stock;
        } else if (localBasket[i].productId === basketProductDto.productId && basketProductDto.quantity <= 0) {
          localBasket.splice(i, 1);
        }
      }
    }
    this.localStorage.clear('basket');
    if (localBasket && localBasket.length > 0){
      this.localStorage.store('basket', localBasket);
    }
    this.emitLocalBasket();
  }

  removeProductFromLocalBasket(basketProductDto: BasketProductDto): void {
    let localBasket = this.localStorage.retrieve('basket');
    localBasket = localBasket.filter(e => e !== basketProductDto);
    this.localStorage.clear('basket');
    if (localBasket && localBasket.length > 0){
      this.localStorage.store('basket', localBasket);
    }
    this.emitLocalBasket();
  }

  removeAllFromLocalBasket(): void {
    this.localStorage.clear('Basket');
    this.emitLocalBasket();
  }
}

