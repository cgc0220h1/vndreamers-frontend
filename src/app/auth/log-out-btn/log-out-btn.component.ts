import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-out-btn',
  templateUrl: './log-out-btn.component.html',
  styleUrls: ['./log-out-btn.component.scss']
})
export class LogOutBtnComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/').then(() => {
      this.snackBar.open('Đăng xuất thành công', '', {
        duration: 1000
      });
    });
  }
}
