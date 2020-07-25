import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserProfileRoutingModule} from './user-profile-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LayoutsComponent} from './layouts/layouts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from './user/user.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [UserComponent, LayoutsComponent, UserComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class UserProfileModule {
}
