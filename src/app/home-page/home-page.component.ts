import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  searchProducts = false;

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.isSearch$().subscribe(isSearch => this.searchProducts = isSearch);
    this.productService.getProductsByCategory('Bestseller').subscribe();
  }

}
