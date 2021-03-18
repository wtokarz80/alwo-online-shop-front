import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';
import {BasketService} from '../services/basket.service';
import {BasketProductDto} from '../models/basketProductDto';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;
  userRole: string;
  public basketAmount: number;

  constructor(private authService: AuthService,
              private router: Router,
              private basketService: BasketService,
              private productsService: ProductService) { }

  ngOnInit(): void  {
    this.initStores();
    this.authService.getIsLogged$().subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userRole.subscribe((data: string) => this.userRole = data);

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
    this.productsService.setSearchValue($event);
    this.router.navigateByUrl('/');
  }
}
