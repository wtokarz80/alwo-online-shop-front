import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {BasketService} from '../services/basket.service';
import {BasketProductDto} from '../models/basketProductDto';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;

  isLoggedIn: boolean;

  constructor(private basketService: BasketService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getIsLogged$().subscribe((data: boolean) => this.isLoggedIn = data);
  }

  addProductToBasket(product: Product): void {
    const basketProductDto = new BasketProductDto(product.id,
      1,
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
}
