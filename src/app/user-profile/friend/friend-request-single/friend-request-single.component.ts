import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '../../../model/User';
import {FriendService} from '../../../service/user/friend.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {LayoutsComponent} from '../../layouts/layouts.component';

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

  @Output()
  denyRequestEvent = new EventEmitter();

  constructor(private friendService: FriendService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<LayoutsComponent>) {
  }

  ngOnInit(): void {
  }

  confirmRequest(): void {
    this.friendService.confirmRequest(this.friendRequest).subscribe(next => {
      console.log(next);
      this.confirmRequestEvent.emit(this.friendRequest);
      this.snackBar.open(`Bạn và ${this.friendRequest.first_name} ${this.friendRequest.last_name} đã trở thành bạn bè`, '', {
        duration: 2500
      });
    }, error => {
      console.log(error);
    });
  }

  denyRequest(): void {
    this.friendService.removeFriendship(this.friendRequest.id).subscribe(next => {
      console.log(next);
      this.denyRequestEvent.emit(this.friendRequest);
      this.snackBar.open(`Bạn đã huỷ yêu cầu kết bạn`, '', {
        duration: 2500
      });
    }, error => {
      console.log(error);
    });
  }
}
