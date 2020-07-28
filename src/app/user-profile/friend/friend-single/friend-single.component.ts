import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../model/User';

@Component({
  selector: 'app-friend-single',
  templateUrl: './friend-single.component.html',
  styleUrls: ['./friend-single.component.scss']
})
export class FriendSingleComponent implements OnInit {
  @Input()
  friend: IUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
