import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8080/admin/alwo/categories', category).pipe(tap(console.log));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/alwo/categories');
  }


  deleteCategory(id: number): Observable<{}>{
    return this.http.delete<{}>('http://localhost:8080/admin/alwo/categories' + '/' + id).pipe(tap(console.log));
  }
}
