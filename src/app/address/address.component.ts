import { Component, OnInit } from '@angular/core';
import {Address} from '../models/address';
import {AddressService} from '../services/address.service';
import {Location} from '@angular/common';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  model: Partial<Address> = {};
  addressTypes: Array<string> = ['INVOICE', 'DELIVERY'];


  constructor(private addressService: AddressService,
              private location: Location,
              public orderService: OrderService) { }

  ngOnInit(): void {
  }

  public back(): void {
    this.location.back();
  }
}


