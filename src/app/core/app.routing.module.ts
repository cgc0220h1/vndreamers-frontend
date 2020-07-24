import {RouterModule, Routes} from '@angular/router';
import {FormLoginSignupComponent} from '../form-login/form-login-signup.component';
import {NgModule} from '@angular/core';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {PostFormComponent} from '../post-form/post-form.component';
import {PersonalPageComponent} from '../personal-page/personal-page.component';

const routes: Routes = [
  {
    path: 'register',
    component: FormLoginSignupComponent
  },
  {
    path: 'login',
    component: FormLoginSignupComponent
  },
  {
    path: '',
    component: FormLoginSignupComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'username',
    component: PersonalPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
