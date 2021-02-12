import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public productService: ProductService) { }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe();
  }
}
