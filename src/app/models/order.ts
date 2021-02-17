import {Address} from './address';
import {OrderedProduct} from './orderedProduct';

export class Order {

  constructor(public paymentId: number, public shipmentId: number, public addresses: Address[], public orderedProducts: OrderedProduct[]){}
}
