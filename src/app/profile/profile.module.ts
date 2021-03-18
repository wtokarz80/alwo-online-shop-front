import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserPanelComponent} from '../user-panel/user-panel.component';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from '../orders/orders.component';

const routes: Routes = [
  {path: '', component: UserPanelComponent},
  {path: 'orders', component: OrdersComponent},
];

@NgModule({
  exports: [RouterModule,
    UserPanelComponent,
    OrdersComponent
  ],
  declarations: [
    UserPanelComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
