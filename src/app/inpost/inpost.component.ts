import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InpostService} from './inpost.service'
import { get } from 'scriptjs';

@Component({
  selector: 'app-inpost',
  templateUrl: './inpost.component.html',
  styleUrls: ['./inpost.component.css']
})
export class InpostComponent implements OnInit {

  @ViewChild('map')
  map: ElementRef;

  constructor(){
    // System.import('path/to/your/module').then(refToLoadedModule => {
    //     refToLoadedModule.someFunction();
    //   }
    // );
  }


  ngOnInit(): void {
    // window.easyPackAsyncInit = () => {
    // setTimeout(() => this.map.nativeElement.init({}), 2000);
    // this.map.nativeElement.init({});
    // };

    // this.inpostService.getScript();
    // get('https://geowidget.easypack24.net/js/sdk-for-javascript.js', () => {
    // });
  }


}
