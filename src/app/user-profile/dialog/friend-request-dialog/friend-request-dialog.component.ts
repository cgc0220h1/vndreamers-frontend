import {Component, Inject, OnInit} from '@angular/core';
import {FriendService} from '../../../service/friend.service';
import {IUser} from '../../../model/User';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-friend-request-dialog',
  templateUrl: './friend-request-dialog.component.html',
  styleUrls: ['./friend-request-dialog.component.scss']
})
export class FriendRequestDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public friendRequestList: IUser[]) {
  }

  ngOnInit(): void {
  }

}
