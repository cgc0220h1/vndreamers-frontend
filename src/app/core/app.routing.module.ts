import {RouterModule, Routes} from '@angular/router';
import {FormLoginComponent} from '../form-login/form-login.component';
import {NgModule} from '@angular/core';

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
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
