import {EventEmitter, Injectable, Output} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {first, switchMap, tap} from 'rxjs/operators';
import {BasketProductDto} from '../models/basketProductDto';
import {LocalStorageService} from 'ngx-webstorage';
import {ApiBasketService} from './api-basket.service';
import {LocalBasketService} from './local-basket.service';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  @Output() basketAmount: EventEmitter<number> = new EventEmitter();
  @Output() basketProductsPrice: EventEmitter<number> = new EventEmitter();

  private store$ = new BehaviorSubject<BasketProductDto[]>([]);


  constructor(private http: HttpClient,
              private localStorage: LocalStorageService,
              private authService: AuthService,
              private apiBasketService: ApiBasketService,
              private localBasketService: LocalBasketService) {
  }

  public getBasketProducts$(): Observable<BasketProductDto[]> {
    return this.store$.asObservable();
  }

  public loadBasketProducts$(): void {
    this.authService.getIsLogged$().pipe(
      switchMap(isLogged => {
        if (isLogged) {
          return this.apiBasketService.getUserBasketProductsFromApi();
        }
        return this.localBasketService.getBasketProducts$();
      }),
      tap(basketProducts => this.store$.next(basketProducts))
    ).subscribe();
  }

  public mergeBasket(): void {
    const localBasket: BasketProductDto[] = this.getUserBasketProductsFromStorage();
    this.localStorage.clear('basket');
    if (localBasket && localBasket.length > 0) {
      this.apiBasketService.addProductsToBasketApi(localBasket).pipe(
        tap(console.log)
      ).subscribe(
        result => this.store$.next(result),
        error => console.log(error)
      );
    }
  }


  public getUserBasketProductsFromStorage(): BasketProductDto[] {
    return this.localStorage.retrieve('basket');
  }

  public updateBasket(basketProductDto: BasketProductDto): void {
    this.authService.getIsLogged$().pipe(
      first(),
      tap(isLogged => {
        if (isLogged) {
          this.apiBasketService.updateBasketProduct(basketProductDto).subscribe(
            data => this.store$.next(data)
          );
        } else {
          this.localBasketService.updateBasketProduct(basketProductDto);
        }
      })
    ).subscribe();
  }

  public addProductToBasket(basketProductDto: BasketProductDto): void {
    this.authService.getIsLogged$().pipe(
      first(),
      tap(isLogged => {
        if (isLogged) {
          this.apiBasketService.addProductToBasketApi(basketProductDto).subscribe(
            data => this.store$.next(data)
          );
        } else {
          this.localBasketService.addProductToLocalBasket(basketProductDto);
        }
      })
    ).subscribe();
  }

  public removeProductFromBasket(basketProductDto: BasketProductDto): void {
    this.authService.getIsLogged$().pipe(
      first(),
      tap(isLogged => {
        if (isLogged) {
          this.apiBasketService.removeProductFromBasketApi(basketProductDto.id).subscribe(
            data => this.store$.next(data)
          );
        } else {
          this.localBasketService.removeProductFromLocalBasket(basketProductDto);
        }
      })
    ).subscribe();
  }

  public removeAllFromBasket(): void {
    this.authService.getIsLogged$().pipe(
      first(),
      tap(isLogged => {
        if (isLogged) {
          this.apiBasketService.removeAllFromBasketApi().subscribe(
            data => {
              if (data) {
                const emptyBasket: BasketProductDto[] = [];
                this.store$.next(emptyBasket);
              }
            }
          );
        } else {
          this.localBasketService.removeAllFromLocalBasket();
        }
      })
    ).subscribe();
  }
}
