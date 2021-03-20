import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';
import {BasketService} from '../services/basket.service';
import {BasketProductDto} from '../models/basketProductDto';
import {filter} from 'rxjs/operators';
import {Category} from '../models/category';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Category[];


  isLoggedIn: boolean;
  username: string;
  userRole: string;
  public basketAmount: number;

  constructor(private authService: AuthService,
              private router: Router,
              private basketService: BasketService,
              public productService: ProductService) { }

  ngOnInit(): void  {
    this.initStores();
    this.authService.getIsLogged$().subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userRole.subscribe((data: string) => this.userRole = data);

    this.productService.getAllCategories().subscribe(data =>  this.categories = data);

    this.basketService.getBasketProducts$().pipe(
    ).subscribe((data: BasketProductDto[]) => {
      this.basketAmount = data.reduce((sum, curr) => sum + curr.quantity, 0);
    });
    this.username = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
  }

  public logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

  private initStores(): void {
    this.basketService.loadBasketProducts$();
    this.authService.loadAuthData();
  }

  search($event: string): void {
    this.productService.setSearchValue($event);
    this.router.navigateByUrl('/');
  }

  public redirectTo(uri: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  selectCategory(category: Category): void {
    this.productService.onCategoryClick(category.categoryName);
  }

}


