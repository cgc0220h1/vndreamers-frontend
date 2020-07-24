import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WallComponent} from './wall/wall.component';

const routes: Routes = [
  {
    path: '',
    component: WallComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
