import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {IUser} from '../../model/User';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/post.service';
import {IPost} from '../../model/Post';
import {MatDialog} from '@angular/material/dialog';
import {FriendRequestDialogComponent} from '../dialog/friend-request-dialog/friend-request-dialog.component';
import {FriendService} from '../../service/friend.service';
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
  posts: IPost[];
  userLoggedIn: IUser;
  friendRequestList: IUser[] = [];
  friendList: IUser[];

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService,
              private matDialog: MatDialog,
              private friendService: FriendService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // this.userRequested = this.userService.getUserLoggedIn();
    this.userLoggedIn = this.userService.getUserLoggedIn();
    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.userService.getByUsername(this.username).subscribe(user => {
        this.userRequested = user;
        this.postService.getPostsOtherUser(this.userRequested.id).subscribe(posts => {
          this.posts = posts;
        });
        this.friendService.getFriendList(this.userRequested.id).subscribe(friends => {
          this.friendList = friends;
        });
      });
    });
  }

  showFriendRequest(): void {
    this.friendService.getUserRequest().subscribe(next => {
      this.friendRequestList = next;
      if (this.friendRequestList.length === 0) {
        this.snackBar.open('Bạn không có lời mời kết bạn nào', '', {
          duration: 2500
        });
        return;
      }
      const dialogRef = this.matDialog.open(FriendRequestDialogComponent, {
        data: this.friendRequestList
      });
      dialogRef.afterClosed().subscribe(() => {
        this.friendService.getFriendList(this.userRequested.id).subscribe(friends => {
          this.friendList = friends;
        });
      });
    });
  }
}
