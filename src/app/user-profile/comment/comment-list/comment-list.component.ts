import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../model/comment';
import {PostService} from '../../../service/post.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  commentList: IComment[] = [];

  @Input()
  postId: Subject<number>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postId.subscribe(postId => {
      this.postService.getCommentsByPost(postId).subscribe(response => {
        this.commentList = response;
      });
    });
  }
}
