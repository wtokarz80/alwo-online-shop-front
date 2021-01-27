import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      src: 'assets/1232.jpg',
      title: 'The Shadow of the Wind',
      price: '$25.00'
    },
    {
      src: 'assets/7998632.jpg',
      title: 'A Novel Bookstore',
      price: '$35.00'
    },
    {
      src: 'assets/44890081._SY475_.jpg',
      title: 'My Dark Vanessa',
      price: '$18.00'
    },
    {
      src: 'assets/52578297.jpg',
      title: 'The Midnight Library',
      price: '$34.00'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
