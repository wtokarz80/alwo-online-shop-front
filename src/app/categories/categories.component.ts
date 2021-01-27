import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [
    `Children's Literature`,
    'Fiction',
    'Non-Fiction',
    'Drama',
    'Poetry',
    'Fairy Tale',
    'Biography'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
