import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Payment} from '../models/payment';
import {PaymentService} from '../services/payment.service';
import {OrderService} from '../services/order.service';
import {OrderStage, ShipmentEnum} from '../models/orderStage';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  ShipmentEnum = ShipmentEnum;
  payments: Payment[];
  status = false;
  selected: string;
  orderStage$: OrderStage;

  constructor(public paymentService: PaymentService,
              public orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getStage().subscribe(
      data => {
        this.orderStage$ = data;
        if (data.payment) {
          this.selected = data.payment.paymentMethod;
        }
      }
    );
    this.paymentService.getAllPayments().subscribe(data => {
      this.payments = data;
    });
  }

  onSelectPayment(payment: Payment): void {
    this.orderStage$.payment = payment;
    this.orderService.setState(this.orderStage$);
  }

}
