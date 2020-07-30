import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ChartComponent} from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'listUser',
        component: UserManagerComponent
      },
      {
        path: 'view/:id',
        component: UserProfileComponent
      },
      {
        path: 'chart',
        component: ChartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
