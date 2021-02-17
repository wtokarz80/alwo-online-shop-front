import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BasketProductDto} from '../models/basketProductDto';
import {Address} from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  constructor(private httpClient: HttpClient) { }

  getAddressTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8080/alwo/address-types');
  }

  addAddress(address: Address): void {
    console.log(address);
  }
}
