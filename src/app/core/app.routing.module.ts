import {RouterModule, Routes} from '@angular/router';
import {FormLoginComponent} from '../form-login/form-login.component';
import {NgModule} from '@angular/core';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'register',
    component: FormLoginComponent
  },
  {
    path: 'login',
    component: FormLoginComponent
  },
  {
    path: '',
    component: FormLoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
