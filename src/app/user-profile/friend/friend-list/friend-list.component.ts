import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../model/User';
import {FriendService} from '../../../service/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  friendList: IUser[];

  @Input()
  userRequest: IUser;

  constructor(private friendService: FriendService) {
  }

  ngOnInit(): void {
    this.friendService.getFriendList(this.userRequest.id).subscribe(next => {
      this.friendList = next;
      console.log(this.friendList);
    });
  }

}
