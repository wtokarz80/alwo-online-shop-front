import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public selectedCategory: string;
  public products: Product[];
  constructor(public http: HttpClient) {
  }

  public onCategoryClick(chosenCategory: string): void {
      this.selectedCategory = chosenCategory;
      this.params().subscribe();
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products`).pipe(
      map((products: Product[]) => products.map((product, index) => ({...product, imgSrc: `${index}.jpg`}))),
      tap(products => this.products = products)
    );
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.API_URL}/categories`);
  }

  public params(): Observable<Product[]> {
    // todo: myParams = myParams.append('categories', 'Fiction');
    return this.http.get<Product[]>(`${environment.API_URL}/products?categories=${this.selectedCategory}`)
      .pipe(
        map((products: Product[]) => products.map((product, index) => ({...product, imgSrc: `${index}.jpg`}))),
        tap(products => this.products = products));
  }
}
