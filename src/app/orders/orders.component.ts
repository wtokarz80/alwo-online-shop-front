import { Component, OnInit } from '@angular/core';
import {Category} from '../models/category';
import {Order} from '../models/order';
import {OrderService} from '../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(data => {
      this.orders = data;
    });
  }

  viewDetail(order: Order): void {
    console.log(order);
  }
}
