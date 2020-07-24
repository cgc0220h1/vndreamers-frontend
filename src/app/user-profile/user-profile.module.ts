import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserProfileRoutingModule} from './user-profile-routing.module';
import {WallComponent} from './wall/wall.component';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [WallComponent, UserInfoComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule {
}
