import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {AuthModule} from '../auth/auth.module';
import {MatIconModule} from '@angular/material/icon';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ChartsModule} from 'ng2-charts';
import {UserBarChartComponent} from './chart/user-bar-chart/user-bar-chart.component';
import {SelectTypeComponent} from './chart/slect-type/select-type.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {UserDoughnutChartComponent} from './chart/user-doughnut-chart/user-doughnut-chart.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    LayoutComponent,
    UserManagerComponent,
    UserProfileComponent,
    PostEditComponent,
    UserBarChartComponent,
    SelectTypeComponent,
    UserDoughnutChartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AuthModule,
    MatIconModule,
    FormsModule,
    Ng2SearchPipeModule,
    ChartsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminModule {
}
