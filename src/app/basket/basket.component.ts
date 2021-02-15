import { Component, OnInit } from '@angular/core';
import {BasketService} from '../services/basket.service';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/services/auth.service';
import {BasketProductDto} from '../models/basketProductDto';
import { Location } from '@angular/common';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  isLoggedIn: boolean;
  basketProductsDto: Observable<BasketProductDto[]>;
  total: number;
  shipmentPrice = 0;

  constructor(private basketService: BasketService,
              private authService: AuthService,
              private location: Location) { }

  ngOnInit(): void {
    this.basketProductsDto = this.basketService.getBasketProducts$();
    this.authService.getIsLogged$().subscribe((data: boolean) => this.isLoggedIn = data);
    this.basketService.basketProductsPrice.subscribe((data: number) => this.total = data);
    this.basketService.getBasketProducts$().pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        });
        return data;
      }),
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

  public back(): void {
    this.location.back();
  }

  private sortProducts(): void {
    this.basketProductsDto = this.basketProductsDto.pipe(
      map((data) => {
        data.sort((a, b) => {
          return a < b ? -1 : 1;
        });
        return data;
      })
    );
  }

  onShipmentCost(shipmentPrice: number): void {
    this.shipmentPrice = shipmentPrice;
  }

  next(): void {
    console.log('not implemented yet');
  }
}
