import { Component, OnInit } from '@angular/core';
import {OrderStage} from '../models/orderStage';
import {Observable} from 'rxjs';
import {BasketProductDto} from '../models/basketProductDto';
import {map} from 'rxjs/operators';
import {BasketService} from '../services/basket.service';
import {OrderService} from '../services/order.service';
import {Order} from '../models/order';
import {OrderedProduct} from '../models/orderedProduct';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  total: number;
  // shipmentPrice = 0;
  orderStage$: OrderStage;
  basketProductsDto: Observable<BasketProductDto[]>;
  private orderedProducts: OrderedProduct[] = [];


  constructor(private  basketService: BasketService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.basketProductsDto = this.basketService.getBasketProducts$();
    this.orderService.getStage().subscribe(
      data => {
        this.orderStage$ = data; }
    );
    this.basketService.getBasketProducts$().pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        });
        data.forEach( product => {
          const orderedProduct = new OrderedProduct(product.productId, product.quantity);
          this.orderedProducts.push(orderedProduct);
        });
        return data;
      }),
    ).subscribe((data: BasketProductDto[]) => {
      this.total = data.reduce((sum, curr) => sum + (curr.price * curr.quantity), 0);
    });
  }


  submitOrder(): void {
    const order: Order = new Order();
    order.addresses = this.orderStage$.addresses;
    order.orderedProducts = this.orderedProducts;
    order.paymentId = this.orderStage$.payment.id;
    order.shipmentId = this.orderStage$.shipment.id;
    this.orderService.clearLocalStorage();
    console.log(order);
    this.orderService.postOrder(order).subscribe();
  }
}
