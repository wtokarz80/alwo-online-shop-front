import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {

  addresses: Address[] = [];
  addressTypes: Array<string> = ['INVOICE', 'DELIVERY'];
  nestedForm: FormGroup;
  orderStage: OrderStage;
  productCost: number;
  private orderServiceGetStageSubscription: Subscription;

  constructor(private addressService: AddressService,
              private location: Location,
              public orderService: OrderService,
              private formBuilder: FormBuilder,
              private basketService: BasketService) { }

  ngOnDestroy(): void {
        if (this.orderServiceGetStageSubscription) {
          this.orderServiceGetStageSubscription.unsubscribe();
        }
    }

  ngOnInit(): void {
    this.nestedForm = this.formBuilder.group({
      address: this.formBuilder.array([this.addAddressGroup()])
    });
    console.log('generate form');
    this.orderServiceGetStageSubscription = this.orderService.getStage().subscribe(
      data => {
        this.orderStage = data;
        this.fillForms();
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
    this.orderStage.addresses = this.addresses;
    this.orderService.setState(this.orderStage);
    console.log(this.orderStage);
  }

  private fillForms(): void {
    const addresses = (this.orderStage && this.orderStage.addresses) || [];
    if (addresses.length > 1) {
      this.addAddress();
    }
    for (let i = 0; i < addresses.length; i++){
      this.addressArray.controls[i].get('firstName').setValue(addresses[i].firstName);
      this.addressArray.controls[i].get('lastName').setValue(addresses[i].lastName);
      this.addressArray.controls[i].get('email').setValue(addresses[i].email);
      this.addressArray.controls[i].get('phone').setValue(addresses[i].phone);
      this.addressArray.controls[i].get('street').setValue(addresses[i].street);
      this.addressArray.controls[i].get('apartmentNumber').setValue(addresses[i].apartmentNumber);
      this.addressArray.controls[i].get('zipCode').setValue(addresses[i].zipCode);
      this.addressArray.controls[i].get('city').setValue(addresses[i].city);
      this.addressArray.controls[i].get('description').setValue(addresses[i].description);
      this.addressArray.controls[i].get('contactType').setValue(addresses[i].contactType);
    }
    // addresses.forEach(address => {
    //   this.addressArray.controls[0].get('firstName').setValue(address.firstName);
    // });
    console.log(addresses);
  }
}
