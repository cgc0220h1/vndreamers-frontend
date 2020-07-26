import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {IUser} from '../../model/User';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/post.service';
import {IPost} from '../../model/Post';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutsComponent implements OnInit {

  user: IUser;
  username: string;
  posts: IPost[];
  userLoggedIn: IUser;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUserLoggedIn();
    this.userLoggedIn = this.userService.getUserLoggedIn();
    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.userService.getByUsername(this.username).subscribe(user => {
        this.user = user;
        this.postService.getPostsOtherUser(this.user.id).subscribe(posts => {
          this.posts = posts;
        });
      });
    });
  }
}
