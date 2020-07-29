import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth.guard';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminGuard} from '../admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: ':username',
    loadChildren: () => import('../user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/:name',
    loadChildren: () => import('../admin-profile/admin-profile.module').then(m => m.AdminProfileModule),
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatSnackBarModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
