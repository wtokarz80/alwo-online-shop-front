import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('map')
  map: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, public productService: ProductService) { }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe();
    // window.easyPackAsyncInit = () => {
    setTimeout(() => this.map.nativeElement.init({}), 2000);
      // this.map.nativeElement.init({});
    // }
  }
}
