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
  commentContent = '';

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

  submitComment(): void {
    if (this.commentContent !== null && this.commentContent !== '') {
      this.comment = {
        content: this.commentContent
      };
      this.postService.submitComment(this.comment, this.postId).subscribe(next => {
        console.log(next);
        this.snackBar.open('Đăng bình luận thành công', '', {
          duration: 2500
        });
        this.commentSubmitted.emit(next);
      }, error => {
        console.log(error);
        this.snackBar.open('Đăng bình luận không thành công', '', {
          duration: 2500
        });
      });
    } else {
      this.snackBar.open('Bình luận không được để trống!', '', {
        duration: 1000
      });
    }
  }
}
