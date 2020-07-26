import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LayoutsComponent} from './layouts/layouts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AuthRoutingModule {

}
