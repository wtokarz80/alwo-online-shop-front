import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Shipment} from '../models/shipment';
import {ShipmentService} from '../services/shipment.service';
import {OrderService} from '../services/order.service';
import {OrderStage} from '../models/orderStage';
import {Router} from '@angular/router';
import {Inpost} from '../models/inpost';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  shipments: Shipment[];
  selected: string;
  status = false;
  orderStage$: OrderStage;

  constructor(public shipmentService: ShipmentService,
              public orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.shipmentService.getAllShipments().subscribe(data => {
      this.shipments = data;
    });
    this.orderService.getStage().subscribe(
      data => {
        this.orderStage$ = data;
        if (data.shipment) {
          this.selected = data.shipment.shipmentMethod;
        }
      }
    );
  }

  onSelectShipment(shipment: Shipment): void {
    this.orderStage$.shipment = shipment;

    if (shipment.shipmentMethod === 'Parcel locker'){
      this.checkAddresses();
      this.router.navigateByUrl('/inpost');
    }
    if (shipment.shipmentMethod !== 'Parcel locker'){
      this.orderStage$.inpost = new Inpost();
    }
    this.orderService.setState(this.orderStage$);
  }

  // public redirectTo(uri: string): void{
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
  //     this.router.navigate([uri]));
  // }
  private checkAddresses(): void {
    if (this.orderStage$.addresses){
      this.orderStage$.addresses = this.orderStage$.addresses.filter(obj => obj.contactType !== 'DELIVERY');
    }
  }
}
