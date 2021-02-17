import { Component, OnInit } from '@angular/core';
import {Address} from '../models/address';
import {AddressService} from '../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  model: Partial<Address> = {};
  addressTypes: string[];


  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    this.addressService.getAddressTypes().subscribe(addressTypes => this.addressTypes = addressTypes);
  }

  addAddress(): void {
    console.log(this.model);
    this.addressService.addAddress(this.model as Address);
  }
}


