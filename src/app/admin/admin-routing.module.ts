import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserBarChartComponent} from './chart/user-bar-chart/user-bar-chart.component';
import {SelectTypeComponent} from './chart/slect-type/select-type.component';

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
        component: SelectTypeComponent,
        children: [
          {
            path: 'result',
            component: UserBarChartComponent
          }
        ]
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
