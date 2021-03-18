import {Address} from './address';
import {OrderedProduct} from './orderedProduct';

export class OrderData {

  paymentId: number;
  shipmentId: number;
  addresses: Address[];
  orderedProducts: OrderedProduct[];

  constructor(){}
}
