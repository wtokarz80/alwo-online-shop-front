import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {Address} from '../models/address';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {OrderStage} from '../models/orderStage';
import {OrderService} from '../services/order.service';
import {Router} from '@angular/router';
import {Inpost} from '../models/inpost';
import { get } from 'scriptjs';
declare var easyPack;

@Component({
  selector: 'app-inpost',
  templateUrl: './inpost.component.html',
  styleUrls: ['./inpost.component.css']
})
export class InpostComponent implements OnDestroy, AfterViewInit {

  @ViewChild('map')
  map: ElementRef;

  public locker$: Observable<Inpost>;
  public lockerSubscription: Subscription;
  public orderStage: OrderStage;
  inpost: Inpost;
  addresses: Address[] = [];

  constructor(public orderService: OrderService,
              private router: Router){
  }

  ngAfterViewInit(): void {


    get('https://geowidget.easypack24.net/js/sdk-for-javascript.js', () => {
      setTimeout(() => this.initMap(), 500);
    });

    window.addEventListener('locker', (e) => {
      console.log('locker details', e);
    });

    this.orderService.getStage().subscribe(
      data => {this.orderStage = data;
      }
    );

    this.locker$ = fromEvent(window, 'locker').pipe(
      distinctUntilChanged(),
      map((result: any) => {
        let output = new Inpost();
        if (result && result.detail){
          output = this.createLockerAddress(result);
        }
        return output;
      })
    );

    this.lockerSubscription = this.locker$.subscribe(result => {
        if (this.orderStage) {
          this.orderStage.inpost = result;
        }
        this.orderService.setState(this.orderStage);
        console.log(this.orderStage);
        this.router.navigateByUrl('/basket');
      }
    );
  }

  // ngOnInit(): void {
  //
  //
  // }

  ngOnDestroy(): void {
    if (this.lockerSubscription) {
      this.lockerSubscription.unsubscribe();
    }
  }

  private createLockerAddress(result: any): Inpost {
    const output = new Inpost();
    output.lockerName = result.detail.name || 'no name';
    output.street = result.detail.address_details.street;
    output.buildingNumber = result.detail.address_details.building_number;
    output.zipCode = result.detail.address_details.post_code;
    output.city = result.detail.address_details.city;
    output.description = '';
    return output;
  }

  private initMap(): void {
    console.log('map init');
    easyPack.init({
      mapType: 'osm',
      searchType: 'osm',
    });
    const map2 = new easyPack.mapWidget('easypack-map', (point) => {
      const event = new CustomEvent('locker', {detail: point});
      window.dispatchEvent(event);
    });
  }


}
