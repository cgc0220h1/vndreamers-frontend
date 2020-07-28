import {Component, Inject, OnInit} from '@angular/core';
import {IUser} from '../../../model/User';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-friend-request-dialog',
  templateUrl: './friend-request-dialog.component.html',
  styleUrls: ['./friend-request-dialog.component.scss']
})
export class FriendRequestDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public friendRequestList: IUser[],
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  removeFriendRequest(friendRequest: IUser): void {
    this.friendRequestList = this.friendRequestList.filter(currentRequest => currentRequest.id !== friendRequest.id);
    this.snackBar.open(`Bạn và ${friendRequest.first_name} ${friendRequest.last_name} đã trở thành bạn bè`, '', {
      duration: 2500
    });
  }
}
