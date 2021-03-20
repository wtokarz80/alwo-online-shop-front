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
import {UserPanelComponent} from './user-panel/user-panel.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminAuthGuard} from './auth/admin-auth.guard';
import {OrdersComponent} from './orders/orders.component';
import {EditCategoriesComponent} from './edit-categories/edit-categories.component';

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
  {path: 'user',  component: UserPanelComponent, canActivate: [AuthGuard], children: [
      {path: 'orders', component: OrdersComponent}
    ]},
  {path: 'admin', component: AdminPanelComponent, canActivate: [AdminAuthGuard], children: [
      {path: 'categories', component: EditCategoriesComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
