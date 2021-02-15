import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '../models/category';
import {ProductService} from '../services/product.service';
import {Payment} from '../models/payment';
import {PaymentService} from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Output() selectedPayment = new EventEmitter<Payment>();

  payments: Payment[];
  status = false;
  selected: string;

  constructor(public paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe(data => {
      this.payments = data;
      console.log(data);
    });
  }

  onSelectPayment(payment: Payment): void {
    this.selected = payment.paymentMethod;
    console.log(payment);
  }
}
