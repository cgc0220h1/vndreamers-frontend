import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/post.service';
import {IComment} from '../../../model/comment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  comment: IComment;

  @Input()
  userLoggedIn: IUser;

  @Input()
  postId: number;

  @Output()
  commentSubmitted = new EventEmitter();

  constructor(private postService: PostService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  doComment(content: string): void {
    if (content !== null && content !== '') {
      this.comment = {
        content
      };
      this.postService.submitComment(this.comment, this.postId).subscribe(next => {
        console.log(next);
        this.snackBar.open('Đăng comment thành công', '', {
          duration: 2500
        });
        this.commentSubmitted.emit(next);
      }, error => {
        console.log(error);
        this.snackBar.open('Đăng comment không thành công', '', {
          duration: 2500
        });
      });
    }
  }
}
