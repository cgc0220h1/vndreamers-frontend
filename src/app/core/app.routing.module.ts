import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth.guard';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminGuard} from '../admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: '',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: ':username',
    loadChildren: () => import('../user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatSnackBarModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
