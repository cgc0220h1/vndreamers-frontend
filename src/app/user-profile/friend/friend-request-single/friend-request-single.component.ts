import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '../../../model/User';
import {FriendService} from '../../../service/friend.service';

@Component({
  selector: 'app-friend-request-single',
  templateUrl: './friend-request-single.component.html',
  styleUrls: ['./friend-request-single.component.scss']
})
export class FriendRequestSingleComponent implements OnInit {
  @Input()
  friendRequest: IUser;

  @Output()
  confirmRequestEvent = new EventEmitter();

  constructor(private friendService: FriendService) {
  }

  ngOnInit(): void {
  }

  confirmRequest(): void {
    this.friendService.confirmRequest(this.friendRequest).subscribe(next => {
      console.log(next);
      this.confirmRequestEvent.emit(this.friendRequest);
    }, error => {
      console.log(error);
    });
  }

  denyRequest(): void {
    this.friendService.denyRequest(this.friendRequest.id).subscribe(next => {
      console.log(next);
    });
  }
}
