import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl: string;
  constructor(private http: HttpClient) {
    this.productsUrl = 'http://localhost:8080/alwo/products';
  }

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((products: Product[]) => products.map(
        (product, index) => ({...product, imgSrc: `${index}.jpg`}))
      )
    );
  }
}
