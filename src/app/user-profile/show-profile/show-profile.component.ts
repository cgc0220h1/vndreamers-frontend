import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../model/User';
import {AuthService} from '../../service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../service/user.service';
import {EditProfileDialogComponent} from '../dialog/edit-profile-dialog/edit-profile-dialog.component';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit, AfterViewInit {
  @Input() userRequest: IUser;

  @Input() currentUser: IUser;

  isFriendRequestSent = false;

  @Input()
  listRequestSent: IUser[];

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private friendService: FriendService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.isFriendRequestSent = this.listRequestSent.some(({id}) => id === this.userRequest.id);
  }

  openEditProfileDialog(): void {
    if (this.userRequest === null) {
      return;
    }
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      panelClass: 'custom-dialog',
      hasBackdrop: false,
      data: this.userRequest
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
            this.userRequest = response;
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

  handleFriendRequest(): void {
    if (this.isFriendRequestSent) {
      this.friendService.denyRequest(this.userRequest.id).subscribe(next => {
        console.log(next);
        this.snackBar.open('Huỷ yêu cầu thành công', '', {
          duration: 2500
        });
        this.isFriendRequestSent = false;
      });
    } else {
      this.friendService.sendFriendRequest(this.userRequest).subscribe(() => {
        this.snackBar.open('Gửi yêu cầu thành công', '', {
          duration: 2500
        });
        this.isFriendRequestSent = true;
      }, () => {
        this.snackBar.open('Không thành công! Bạn đã gửi yêu cầu kết bạn tới người này', '', {
          duration: 2500
        });
      });
    }
  }
}
