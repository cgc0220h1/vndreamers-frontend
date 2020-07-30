import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import {AuthModule} from '../auth/auth.module';
import {MatIconModule} from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [LayoutComponent, UserManagerComponent, UserProfileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AuthModule,
    MatIconModule
  ]
})
export class AdminModule { }
