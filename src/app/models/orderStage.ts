import {Shipment} from './shipment';
import {Payment} from './payment';
import {Address} from './address';

export class OrderStage {

  constructor(public shipment: Shipment, public payment: Payment, public addresses: Address[]) {

  }

}
