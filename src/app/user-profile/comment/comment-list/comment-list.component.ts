import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../model/comment';
import {IPost} from '../../../model/Post';
import {IUser} from '../../../model/User';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input()
  commentOfPost: IComment[];

  @Input()
  post: IPost[];

  constructor() {
  }

  ngOnInit(): void {
  }

  removeComment(comment: any): void {
    console.log(comment);
    this.commentOfPost = this.commentOfPost.filter(currentComment => currentComment.id !== comment.id);
  }
}
