import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {IUser} from '../../model/User';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import {IPost} from '../../model/Post';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  user: IUser;
  username: string;
  posts: IPost[];

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(response => {
      this.user = response;
    });
    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      console.log(this.username);
      this.userService.getByUsername(this.username).subscribe(user => {
        this.user = user;
      });
    });
  }

  openEditProfileDialog(): void {
  }
}
