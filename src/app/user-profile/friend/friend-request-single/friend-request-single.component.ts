import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../model/User';

@Component({
  selector: 'app-friend-request-single',
  templateUrl: './friend-request-single.component.html',
  styleUrls: ['./friend-request-single.component.scss']
})
export class FriendRequestSingleComponent implements OnInit {
  @Input()
  friendRequest: IUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
