import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {MainComponent} from './main/main.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {BasketComponent} from './basket/basket.component';
import {AddressComponent} from './address/address.component';
import {SummaryComponent} from './summary/summary.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {InpostComponent} from './inpost/inpost.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'inpost', component: InpostComponent},
  {path: 'address', component: AddressComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'addresses', component: AddressComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'books', component: MainComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'contact', component: ContactPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
