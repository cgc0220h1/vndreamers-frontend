import { Component, OnInit } from '@angular/core';
import {IUser} from '../../model/User';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {AdminService} from '../../service/admin/admin.service';
import {IPost} from '../../model/Post';
import {PostService} from '../../service/user/post.service';
import {CommentService} from '../../service/user/comment.service';
import {IComment} from '../../model/comment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: IUser;
  posts: IPost[];
  comments: IComment[];
  sub: Subscription;
  records: number;
  page = 1;

  gender1: string;

  constructor(private adminService: AdminService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.adminService.getUserById(id).subscribe(next => {
        this.user = next;
        if (this.user.gender === 1){
          this.gender1 = 'Nam';
        }else {
          this.gender1 = 'Nữ';
        }
      }, error => {console.log(error); this.user = null; });

      this.postService.getPostsOtherUser(id).subscribe(next1 => {
        this.posts = next1;
        this.records = next1.length;
      }, error => {console.log(error); });

      this.commentService.getCommentOtherUser(id).subscribe(next3 => {
        this.comments = next3;
      }, error => {console.log(error); });
    });
  }

  deletePost(id: number): void {
    if (confirm('Do you really want to delete this post?')) {
      this.postService.deletePost(id).subscribe(result => {
        this.ngOnInit();
      });
    }
  }



}
