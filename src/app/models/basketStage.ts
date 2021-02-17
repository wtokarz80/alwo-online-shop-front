import {Shipment} from './shipment';
import {Payment} from './payment';

export class BasketStage {

  constructor(public shipment: Shipment, public payment: Payment, public productValue: number) {
  }
}
