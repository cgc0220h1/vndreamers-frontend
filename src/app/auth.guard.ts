import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './service/public/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('access_token') !== null) {
      this.authService.currentUserSubject.subscribe(result => {
        if (result.username === next.params.username) {
          this.snackBar.open(`Chào mừng ${result.username} quay trở lại!`, '', {
            duration: 2500
          });
        }
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
