import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class ShowProfileComponent implements OnInit, OnChanges {
  @Input() userRequest: IUser = {
    username: '',
    avatar: ''
  };

  @Input() currentUser: IUser = {
    username: '',
    avatar: ''
  };

  @Input()
  listRequestSent: IUser[];

  @Input()
  listRequestReceive: IUser[];

  @Output()
  acceptFriendEvent = new EventEmitter();

  isUserReceivedRequest = false;
  isUserSentRequest = false;
  isFriend = false;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private friendService: FriendService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isUserReceivedRequest = this.listRequestSent.some(({id}) => id === this.userRequest.id);
    if (!this.isUserReceivedRequest) {
      this.isUserSentRequest = this.listRequestReceive.some(({id}) => id === this.userRequest.id);
    }
  }

  ngOnInit(): void {
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

  handleOutgoingRequest(): void {
    if (this.isUserReceivedRequest) {
      this.friendService.denyRequest(this.userRequest.id).subscribe(next => {
        this.snackBar.open('Huỷ yêu cầu thành công', '', {
          duration: 2500
        });
        this.isUserReceivedRequest = false;
      });
    } else {
      this.friendService.sendFriendRequest(this.userRequest).subscribe(() => {
        this.snackBar.open('Gửi yêu cầu thành công', '', {
          duration: 2500
        });
        this.isUserReceivedRequest = true;
      }, () => {
        this.snackBar.open('Không thành công! Bạn đã gửi yêu cầu kết bạn tới người này', '', {
          duration: 2500
        });
      });
    }
  }

  handleIncomingRequest(choice: string): void {
    switch (choice) {
      case 'accept':
        this.friendService.confirmRequest(this.userRequest).subscribe(next => {
          this.snackBar.open(`Bạn và ${this.userRequest.first_name} ${this.userRequest.last_name} đã trở thành bạn bè`, '', {
            duration: 2500
          });
          this.isFriend = true;
          this.acceptFriendEvent.emit(this.isFriend);
        });
        break;
      case 'deny':
        this.friendService.denyRequest(this.userRequest.id).subscribe(next => {
          this.snackBar.open('Huỷ yêu cầu thành công', '', {
            duration: 2500
          });
          this.isFriend = false;
          this.isUserSentRequest = false;
        });
        break;
    }
  }
}
