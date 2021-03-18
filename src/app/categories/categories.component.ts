import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../models/category';
import {ProductService} from '../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Category[];

  constructor(public productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  selectCategory(category: Category): void {
    this.productService.onCategoryClick(category.categoryName);
  }

  ngOnDestroy(): void {
    this.productService.clearSelectedCategory();
  }

  public redirectTo(uri: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
