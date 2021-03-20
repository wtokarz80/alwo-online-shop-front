import { Component, OnInit } from '@angular/core';
import {OrderStage} from '../models/orderStage';
import {Observable} from 'rxjs';
import {BasketProductDto} from '../models/basketProductDto';
import {map} from 'rxjs/operators';
import {BasketService} from '../services/basket.service';
import {OrderService} from '../services/order.service';
import {OrderData} from '../models/orderData';
import {OrderedProduct} from '../models/orderedProduct';
import {Address} from '../models/address';
import {Inpost} from '../models/inpost';

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
  isParcelLocker = false;


  constructor(private  basketService: BasketService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.basketProductsDto = this.basketService.getBasketProducts$();
    this.orderService.getStage().subscribe(
      data => {
        this.orderStage$ = data;
        this.checkIfParcelLocker(data);
      }
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
    const order: OrderData = new OrderData();
    order.addresses = this.orderStage$.addresses;
    order.addresses = this.createAddresses();
    order.orderedProducts = this.orderedProducts;
    order.paymentId = this.orderStage$.payment.id;
    order.shipmentId = this.orderStage$.shipment.id;
    this.orderService.clearLocalStorage();
    console.log(order);
    this.orderService.postOrder(order).subscribe();
  }

  private createAddresses(): Address[] {
    const addresses: Address[] = this.orderStage$.addresses;
    const inpost: Inpost = this.orderStage$.inpost;
    if (inpost.lockerName) {
      const address: Address = new Address();
      address.firstName = 'Parcel locker';
      address.lastName = inpost.lockerName;
      address.email = 'inpost@inpost.com';
      address.phone = '722444000';
      address.street = inpost.street;
      address.apartmentNumber = inpost.buildingNumber;
      address.zipCode = inpost.zipCode;
      address.city = inpost.city;
      address.description = inpost.description;
      address.contactType = 'DELIVERY';
      addresses.push(address);
    }
    console.log(addresses);
    return addresses;
  }

  private checkIfParcelLocker(data: OrderStage): void {
    if (data.shipment.shipmentMethod === 'Parcel locker'){
      this.isParcelLocker = true;
    }
  }

}
