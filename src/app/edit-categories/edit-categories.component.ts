import { Component, OnInit } from '@angular/core';
import {Category} from '../models/category';
import {NgModel} from '@angular/forms';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {

  model: Partial<Category> = {};
  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  send(): void {
    console.log(this.model);
    // wykonujemy tu rzutowanie z Partial na model Movie
    this.categoryService.addCategory(this.model as Category).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

  printModel(title: NgModel): void {
    console.log(title);

  }

  deleteCategory(category: Category): void {
    // this.http.deleteMovie('54').subscribe();
    this.categoryService.deleteCategory(category.id).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

}
