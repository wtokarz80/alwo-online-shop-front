import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TokenInterceptor} from './token-interceptor';
import { MainComponent } from './main/main.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { PaginationComponent } from './pagination/pagination.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import { BasketComponent } from './basket/basket.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { AddressComponent } from './address/address.component';
import { SummaryComponent } from './summary/summary.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    MainComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductComponent,
    PaginationComponent,
    ProductDetailsComponent,
    BasketComponent,
    FooterComponent,
    PaymentComponent,
    ShipmentComponent,
    AddressComponent,
    SummaryComponent,
    ConfirmationComponent,
    FooterComponent,
    HomePageComponent,
    ContactPageComponent

  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgxWebstorageModule.forRoot(),
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      FormsModule,
      NgxPaginationModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
