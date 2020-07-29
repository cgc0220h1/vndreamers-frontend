import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    AdminProfileRoutingModule
  ]
})
export class AdminProfileModule { }
