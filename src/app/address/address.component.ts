import { Component, OnInit } from '@angular/core';
import {Address} from '../models/address';
import {AddressService} from '../services/address.service';
import {Location} from '@angular/common';
import {OrderService} from '../services/order.service';
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  model: Partial<Address> = {};
  addressTypes: Array<string> = ['INVOICE', 'DELIVERY'];
  nestedForm: FormGroup;

  constructor(private addressService: AddressService,
              private location: Location,
              public orderService: OrderService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.nestedForm = this.formBuilder.group({
      address: this.formBuilder.array([this.addAddressGroup()])
    });
  }

  private addAddressGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartmentNumber: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: ['', Validators.required],
      description: [],
      contactType: [null, Validators.required]
    });
  }

  get addressArray(): FormArray {
    return this.nestedForm.get('address') as FormArray;
  }

  addAddress(): void {
    if (this.addressArray.length < 2) {
      this.addressArray.push(this.addAddressGroup());
    }
  }

  removeAddress(index: number): void {
    if (this.addressArray.length > 1){
      this.addressArray.removeAt(index);
    }
  }

  submitHandler(): void {
    console.log({...this.nestedForm.value});
  }
}

