import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProductsByCategory('Bestseller').subscribe();
  }

}
