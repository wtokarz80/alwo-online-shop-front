import { Component, OnInit } from '@angular/core';
import {OrderStage} from '../models/orderStage';
import {Observable} from 'rxjs';
import {BasketProductDto} from '../models/basketProductDto';
import {map} from 'rxjs/operators';
import {BasketService} from '../services/basket.service';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  total: number;
  shipmentPrice = 0;
  orderStage$: OrderStage;
  basketProductsDto: Observable<BasketProductDto[]>;


  constructor(private  basketService: BasketService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.basketProductsDto = this.basketService.getBasketProducts$();
    this.orderService.getStage().subscribe(
      data => {
        this.orderStage$ = data;
        if (data.shipment) {
          this.shipmentPrice = data.shipment.shipmentCost;
        }
      }
    );
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


  submitOrder(): void {
    console.log('order submitted');
  }
}
