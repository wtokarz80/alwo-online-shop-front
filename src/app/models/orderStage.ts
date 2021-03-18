import {Shipment} from './shipment';
import {Payment} from './payment';
import {Address} from './address';
import {BasketProductDto} from './basketProductDto';
import {Inpost} from './inpost';

export class OrderStage {

  constructor(public shipment: Shipment, public payment: Payment, public inpost: Inpost, public addresses: Address[]) {

  }

}
