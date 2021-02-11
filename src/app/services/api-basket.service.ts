import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {BasketProductDto} from '../models/basketProductDto';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiBasketService {

  constructor(private http: HttpClient) { }

  public getUserBasketProductsFromApi(): Observable<BasketProductDto[]> {
    return this.http.get<BasketProductDto[]>('http://localhost:8080/alwo/basket').pipe(
      tap(console.log));
  }


  public addProductToBasketApi(basketProductDto: BasketProductDto): Observable<BasketProductDto[]> {
    return this.http.post<BasketProductDto>('http://localhost:8080/alwo/basket', basketProductDto)
      .pipe(tap(console.log));
  }

  public updateBasketProduct(basketProductDto: BasketProductDto): Observable<BasketProductDto[]> {
    return this.http.put<BasketProductDto>('http://localhost:8080/alwo/basket/product', basketProductDto)
      .pipe(tap(console.log));
  }

  public addProductsToBasketApi(basketProductsDto: BasketProductDto[]): Observable<BasketProductDto[]> {
    return this.http.post<BasketProductDto[]>('http://localhost:8080/alwo/basket/products', basketProductsDto)
      .pipe(tap(console.log));
  }

  public removeProductFromBasketApi(id: number): Observable<BasketProductDto[]> {
    return this.http.delete<BasketProductDto[]>(`http://localhost:8080/alwo/basket/del-product/${id}`)
      .pipe(tap(console.log));
  }

  removeAllFromBasketApi(): Observable<boolean> {
    return this.http.delete<boolean>(`http://localhost:8080/alwo/basket`)
      .pipe(tap(console.log));
  }
}
