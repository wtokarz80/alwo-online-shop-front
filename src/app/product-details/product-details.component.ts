import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';
import {BasketProductDto} from '../models/basketProductDto';
import {BasketService} from '../services/basket.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
              public productService: ProductService,
              private basketService: BasketService,
              private location: Location) { }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe();
  }

  public onSubmit(product: Product, event: any): void {
    const quantity: number = parseInt(event.target.amount.value, 10);
    const basketProductDto = new BasketProductDto(
      product.id,
      quantity,
      product.name,
      product.author,
      product.description,
      product.price,
      product.producer,
      product.productType,
      product.stock,
      product.isActive,
      product.url);

    this.basketService.addProductToBasket(basketProductDto);

  }

  public back(): void {
    this.location.back();
  }

}
