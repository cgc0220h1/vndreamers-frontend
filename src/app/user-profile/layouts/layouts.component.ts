import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {IUser} from '../../model/User';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/post.service';
import {IPost} from '../../model/Post';
import {MatDialog} from '@angular/material/dialog';
import {FriendRequestDialogComponent} from '../dialog/friend-request-dialog/friend-request-dialog.component';

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

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userRequested = this.userService.getUserLoggedIn();
    this.userLoggedIn = this.userService.getUserLoggedIn();
    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.userService.getByUsername(this.username).subscribe(user => {
        this.userRequested = user;
        this.postService.getPostsOtherUser(this.userRequested.id).subscribe(posts => {
          this.posts = posts;
        });
      });
    });
  }

  showFriendRequest(): void {
    this.matDialog.open(FriendRequestDialogComponent, {});
  }
}
