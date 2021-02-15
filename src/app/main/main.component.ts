import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

}
