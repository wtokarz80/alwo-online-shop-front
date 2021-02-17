import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Payment} from '../models/payment';
import {PaymentService} from '../services/payment.service';
import {OrderService} from '../services/order.service';
import {OrderStage} from '../models/orderStage';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  payments: Payment[];
  status = false;
  selected: string;
  orderStage$: OrderStage;

  constructor(public paymentService: PaymentService,
              public orderService: OrderService) { }

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe(data => {
      this.payments = data;
    });
    this.orderService.getStage().subscribe(
      data => {
        this.orderStage$ = data;
        if (data.payment) {
          this.selected = data.payment.paymentMethod;
        }
      }
    );
  }

  onSelectPayment(payment: Payment): void {
    this.orderStage$.payment = payment;
    this.orderService.setState(this.orderStage$);
  }
}
