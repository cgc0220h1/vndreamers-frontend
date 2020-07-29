import {Component, Inject, OnInit} from '@angular/core';
import {IUser} from '../../../model/User';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LayoutsComponent} from '../../layouts/layouts.component';

@Component({
  selector: 'app-friend-request-dialog',
  templateUrl: './friend-request-dialog.component.html',
  styleUrls: ['./friend-request-dialog.component.scss']
})
export class FriendRequestDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public friendRequestList: IUser[],
              private dialogRef: MatDialogRef<LayoutsComponent>) {
  }

  ngOnInit(): void {
  }

  removeFriendRequest(friendRequest: IUser): void {
    this.friendRequestList = this.friendRequestList.filter(currentRequest => currentRequest.id !== friendRequest.id);
  }
}
