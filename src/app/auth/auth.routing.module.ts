import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormLoginSignupComponent} from './form-login/form-login-signup.component';

const routes: Routes = [
  {
    path: '',
    component: FormLoginSignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AuthRoutingModule {

}
