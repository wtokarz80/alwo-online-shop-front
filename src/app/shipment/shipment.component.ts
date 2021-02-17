import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Shipment} from '../models/shipment';
import {ShipmentService} from '../services/shipment.service';
import {OrderService} from '../services/order.service';
import {BasketStage} from '../models/basketStage';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  shipments: Shipment[];
  selected: string;
  status = false;
  basketStage$: BasketStage;

  constructor(public shipmentService: ShipmentService,
              public orderService: OrderService) { }

  ngOnInit(): void {
    this.shipmentService.getAllShipments().subscribe(data => {
      this.shipments = data;
    });
    this.orderService.getStage().subscribe(
      data => {
        this.basketStage$ = data;
        if (data.shipment) {
          this.selected = data.shipment.shipmentMethod;
        }
      }
    );
  }

  onSelectShipment(shipment: Shipment): void {
    this.basketStage$.shipment = shipment;
    this.orderService.setState(this.basketStage$);
  }

}
