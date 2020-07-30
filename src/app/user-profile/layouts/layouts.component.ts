import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/public/auth.service';
import {IUser} from '../../model/User';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/user/post.service';
import {IPost} from '../../model/Post';
import {MatDialog} from '@angular/material/dialog';
import {FriendRequestDialogComponent} from '../dialog/friend-request-dialog/friend-request-dialog.component';
import {FriendService} from '../../service/user/friend.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutsComponent implements OnInit {

  userRequested: IUser;
  username: string;
  posts: IPost[] = [];
  userLoggedIn: IUser;
  listFriendRequestReceive: IUser[] = [];
  otherFriendList: IUser[] = [];
  currentFriendList: IUser[] = [];
  listFriendRequestSend: IUser[] = [];

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService,
              private matDialog: MatDialog,
              private friendService: FriendService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userLoggedIn = this.userService.getUserLoggedIn();
    this.userRequested = this.userLoggedIn;
    this.friendService.getUserRequestTo().subscribe(next => {
      this.listFriendRequestSend = next;
    });
    this.friendService.getUserRequest().subscribe(next => {
      this.listFriendRequestReceive = next;
    });
    this.friendService.getFriendList(this.userLoggedIn.id).subscribe(next => {
      this.currentFriendList = next;
    });

    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.userService.getByUsername(this.username).subscribe(user => {
        this.userRequested = user;
        this.postService.getPostsOtherUser(this.userRequested.id).subscribe(posts => {
          this.posts = posts;
        });
        this.friendService.getFriendList(this.userRequested.id).subscribe(friends => {
          this.otherFriendList = friends;
        });
      });
    });
  }

  showFriendRequest(): void {
    if (this.listFriendRequestReceive.length === 0) {
      this.snackBar.open('Bạn không có lời mời kết bạn nào', '', {
        duration: 2500
      });
      return;
    }
    const dialogRef = this.matDialog.open(FriendRequestDialogComponent, {
      data: this.listFriendRequestReceive
    });
    dialogRef.afterClosed().subscribe(() => {
      this.friendService.getFriendList(this.userRequested.id).subscribe(friends => {
        this.otherFriendList = friends;
      });
      this.friendService.getUserRequest().subscribe(next => {
        this.listFriendRequestReceive = next;
      });
    });
  }

  handleFriendEvent(isFriend: boolean): void {
    if (isFriend) {
      this.friendService.getFriendList(this.userRequested.id).subscribe(friends => {
        this.otherFriendList = friends;
      });
      this.friendService.getUserRequest().subscribe(next => {
        this.listFriendRequestReceive = next;
      });
    }
  }

  handleDenyFriendEvent(): void {
    this.friendService.getUserRequest().subscribe(next => {
      this.listFriendRequestReceive = next;
    });
  }

  handleRemoveFriendEvent(): void {
    this.otherFriendList = this.otherFriendList.filter(currentFriend => currentFriend.id !== this.userLoggedIn.id);
  }

  updatePost(event): void {
    this.posts.unshift(event);
  }
}
