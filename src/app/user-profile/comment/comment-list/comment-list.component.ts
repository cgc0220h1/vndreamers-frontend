import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../model/comment';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  commentList: IComment[] = [];

  @Input()
  postId: number;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getCommentsByPost(this.postId).subscribe(next => {
      this.commentList = next;
      console.log(next);
      console.log(this.commentList);
    });
  }
}
