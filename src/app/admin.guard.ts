import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('access_token') !== null && localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.snackBar.open('Chào mừng bạn quay trở lại!', '', {
        duration: 1000
      });
      return true;
    } else if (this.authService.isAuthenticated && localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.snackBar.open('Đang chuyển trang!', '', {
        duration: 1000
      });
      return true;
    } else {
      this.router.navigateByUrl('').then(() => {
        this.snackBar.open('Lỗi xác thực. Vui lòng đăng nhập!', '', {
          duration: 1000
        });
      });
      return false;
    }
  }

}
