import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Shipment} from '../models/shipment';
import {ShipmentService} from '../services/shipment.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  shipments: Shipment[];
  selected: string;
  @Output() shipmentCost = new EventEmitter<number>();

  constructor(public shipmentService: ShipmentService) { }

  ngOnInit(): void {
    this.shipmentService.getAllShipments().subscribe(data => {
      this.shipments = data;
      console.log(data);
    });
  }

  onSelectShipment(shipment: Shipment): void {
    this.selected = shipment.shipmentMethod;
    this.shipmentCost.emit(shipment.shipmentCost);
  }

}
