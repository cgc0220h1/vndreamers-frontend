import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../model/comment';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {CommentService} from '../../../service/user/comment.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.scss']
})
export class CommentSingleComponent implements OnInit {
  @Input()
  comment: IComment;
  toggleEditForm = false;

  constructor(private commentService: CommentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  toggleForm(): void {
    if (this.toggleEditForm) {
      this.toggleEditForm = false;
    } else {
      this.toggleEditForm = true;
    }
  }

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
}
