import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { IndexComponent } from './index/index.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    IndexComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
