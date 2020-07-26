import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../model/User';
import {AuthService} from '../../service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../service/user.service';
import {EditProfileDialogComponent} from '../dialog/edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {
  @Input() user: IUser;


  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  openEditProfileDialog(): void {
    if (this.user === null) {
      return;
    }
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      panelClass: 'custom-dialog',
      hasBackdrop: false,
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        this.snackBar.open('Huỷ cập nhật thông tin', '', {
          duration: 2000,
          panelClass: 'center'
        });
      } else {
        this.userService.updateUser(result).subscribe({
          next: response => {
            this.user = response;
            this.snackBar.open('Cập nhật thành công', '', {
              duration: 2000,
              panelClass: 'center'
            });
          },
          error: err => {
            this.snackBar.open('Có lỗi xảy ra', '', {
              duration: 2000,
              panelClass: 'center'
            });
            console.log(err);
          }
        });
      }
    });
  }
}
