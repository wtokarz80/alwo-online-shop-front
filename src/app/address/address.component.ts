import { Component, OnInit } from '@angular/core';
import {Address} from '../models/address';
import {AddressService} from '../services/address.service';
import {Location} from '@angular/common';
import {OrderService} from '../services/order.service';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import {OrderStage} from '../models/orderStage';
import {Shipment} from '../models/shipment';
import {Payment} from '../models/payment';
import {map} from 'rxjs/operators';
import {BasketProductDto} from '../models/basketProductDto';
import {BasketService} from '../services/basket.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses: Address[] = [];
  model: Partial<Address> = {};
  addressTypes: Array<string> = ['INVOICE', 'DELIVERY'];
  nestedForm: FormGroup;
  orderStage$: OrderStage;
  shipment: Shipment;
  payment: Payment;
  productCost: number;

  constructor(private addressService: AddressService,
              private location: Location,
              public orderService: OrderService,
              private formBuilder: FormBuilder,
              private basketService: BasketService) { }

  ngOnInit(): void {
    this.nestedForm = this.formBuilder.group({
      address: this.formBuilder.array([this.addAddressGroup()])
    });
    this.orderService.getStage().subscribe(
      data => {
        this.orderStage$ = data;
        if (data.shipment) {
          this.shipment = data.shipment;
        }
        if (data.payment) {
          this.payment = data.payment;
        }
      });
    this.basketService.getBasketProducts$().subscribe((data: BasketProductDto[]) => {
      this.productCost = data.reduce((sum, curr) => sum + (curr.price * curr.quantity), 0);
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
    this.addresses = [];
    for (const formGroup of this.addressArray.controls){
      const address = new Address();
      address.firstName = formGroup.get('firstName').value;
      address.lastName = formGroup.get('lastName').value;
      address.email = formGroup.get('email').value;
      address.phone = formGroup.get('phone').value;
      address.street = formGroup.get('street').value;
      address.apartmentNumber = formGroup.get('apartmentNumber').value;
      address.zipCode = formGroup.get('zipCode').value;
      address.city = formGroup.get('city').value;
      address.description = formGroup.get('description').value;
      address.contactType = formGroup.get('contactType').value;
      this.addresses.push(address);
    }
    // console.log({...this.nestedForm.value});
    this.orderStage$.addresses = this.addresses;
    this.orderService.setState(this.orderStage$);
    console.log(this.orderStage$);
  }
}
