import { Component, OnInit } from '@angular/core';
import {BasketService} from '../services/basket.service';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/services/auth.service';
import {BasketProductDto} from '../models/basketProductDto';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  isLoggedIn: boolean;
  basketProductsDto: Observable<BasketProductDto[]>;
  total: number;

  constructor(private basketService: BasketService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.basketProductsDto = this.basketService.getBasketProducts$();
    this.authService.getIsLogged$().subscribe((data: boolean) => this.isLoggedIn = data);
    this.basketService.basketProductsPrice.subscribe((data: number) => this.total = data);
    this.basketService.getBasketProducts$().pipe(
    ).subscribe((data: BasketProductDto[]) => {
      this.total = data.reduce((sum, curr) => sum + (curr.price * curr.quantity), 0);
    });
  }

  public onSelectQuantity(basketProductDto: BasketProductDto): void {
    this.basketService.updateBasket(basketProductDto);
  }

  public removeProductFromBasket(basketProductDto: BasketProductDto): void {
    this.basketService.removeProductFromBasket(basketProductDto);
  }

  public removeAllFromBasket(): void {
    this.basketService.removeAllFromBasket();
  }

}
