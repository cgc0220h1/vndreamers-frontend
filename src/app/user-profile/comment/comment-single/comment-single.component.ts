import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from '../../../model/comment';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {CommentService} from '../../../service/comment.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IPost} from '../../../model/Post';

@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.scss']
})
export class CommentSingleComponent implements OnInit {
  @Input()
  comment: IComment;
  @Input()
  post: IPost;
  toggleEditFormComment = false;

  constructor(private commentService: CommentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  toggleForm(): void {
    if (this.toggleEditFormComment) {
      this.toggleEditFormComment = false;
    } else {
      this.toggleEditFormComment = true;
    }
  }

  @Output()
  deleteCommentEvent = new EventEmitter();

  openDeletePrompt(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Bạn có muốn xoá bình luận này ?',
        label: 'Xoá comment'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'delete':
          this.commentService.deleteComment(this.comment.id).subscribe(comment => {
            this.snackBar.open('Xoá bình luận thành công', '', {
              duration: 2500
            });
            console.log(comment);
            console.log('xoa binh luan thanh cong');
            this.deleteCommentEvent.emit(comment);
          }, error => {
            console.log('delete comment error');
            console.log(error);
          });
          break;
        case 'cancel':
          this.snackBar.open('Huỷ xoá bình luận', '', {
            duration: 2500
          });
      }
    });
  }

  changeContent(): void {
    this.comment.content = document.getElementById('content')['value'];
    console.log(this.comment);
    this.commentService.updateComment( this.post.id, this.comment).subscribe(result => {
      this.toggleForm();
      this.snackBar.open('Đổi nội dung thành công', '', {
        duration: 2500
      });
      console.log('update comment ok');
    }, error => {
      console.log('update content error !');
    });
  }
}
