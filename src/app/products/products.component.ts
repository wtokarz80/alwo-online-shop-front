import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  page = 1;

  constructor(public productService: ProductService) {
  }

  params(): void {
    this.productService.params().subscribe();
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe();
  }
}
