import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Product} from '../models/product';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public selectedCategory: string;
  public products: Product[] = [];
  public product: Product;
  public page = 1;
  private search$ = new BehaviorSubject('');
  constructor(public http: HttpClient) {
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchedProducts(): Observable<Product[]> {
    return of(this.products)
      .pipe(
        map(products => products.filter(product =>
          product.name.toLowerCase().includes(this.search$.getValue().toLowerCase()) ||
          product.author.toLowerCase().includes(this.search$.getValue().toLowerCase())
        ))
      );
  }

  public onCategoryClick(chosenCategory: string): void {
      this.selectedCategory = chosenCategory;
      this.params().subscribe();
  }

  public clearSelectedCategory(): void {
    this.selectedCategory = null;
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products`).pipe(
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

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/products/` + productId).pipe(
      tap(product => this.product = product)
    );
  }

  public getProductsByCategory(category?: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products?categories=${category}`).pipe(
      tap(products => this.products = products)
    );
  }

  isSearch$(): Observable<boolean> {
    return this.search$.asObservable().pipe(map(value => !!value));
  }
}
