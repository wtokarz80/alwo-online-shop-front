import { Component, OnInit } from '@angular/core';
import {Category} from '../models/category';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  selectCategory(category: Category): void {
    this.productService.onCategoryClick(category.categoryName);
  }
}
