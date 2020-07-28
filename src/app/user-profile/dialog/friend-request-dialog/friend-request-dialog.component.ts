import {Component, OnInit} from '@angular/core';
import {FriendService} from '../../../service/friend.service';
import {IUser} from '../../../model/User';

@Component({
  selector: 'app-friend-request-dialog',
  templateUrl: './friend-request-dialog.component.html',
  styleUrls: ['./friend-request-dialog.component.scss']
})
export class FriendRequestDialogComponent implements OnInit {
  friendRequestList: IUser[];

  constructor(private friendService: FriendService) {
  }

  ngOnInit(): void {
    this.friendService.getUserRequest().subscribe(next => {
      this.friendRequestList = next;
    });
  }

}
