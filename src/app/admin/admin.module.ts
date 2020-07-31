import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import {AuthModule} from '../auth/auth.module';
import {MatIconModule} from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { PostEditComponent } from './post-edit/post-edit.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [LayoutComponent, UserManagerComponent, UserProfileComponent, PostEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AuthModule,
    MatIconModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
