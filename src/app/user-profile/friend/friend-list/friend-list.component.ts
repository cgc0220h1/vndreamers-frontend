import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../model/User';
import {FriendService} from '../../../service/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  @Input()
  friendList: IUser[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
