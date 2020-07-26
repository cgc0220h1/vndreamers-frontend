import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {FormLoginComponent} from './form-login/form-login.component';
import {AuthRoutingModule} from './auth.routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormSignupComponent} from './form-signup/form-signup.component';
import {LayoutsComponent} from './layouts/layouts.component';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    FormLoginComponent,
    FormSignupComponent,
    LayoutsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    FlexModule,
  ],
})
export class AuthModule {
}
