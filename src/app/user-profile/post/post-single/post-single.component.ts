import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost} from '../../../model/Post';
import {IUser} from '../../../model/User';
import {IComment} from '../../../model/comment';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnInit {
  commentList: IComment[] = [];
  toggleCommentList = false;

  @Input()
  postData: IPost;

  @Input()
  userData: IUser;

  @Input()
  userLogged: IUser;

  @Output()
  deletePostEvent = new EventEmitter();

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private postService: PostService) {
  }

  ngOnInit(): void {
  }

  deletePost(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        this.snackBar.open('Huỷ xoá trạng thái', '', {
          duration: 2500
        });
      }
      if (result === 'delete') {
        this.postService.deletePost(id).subscribe(response => {
          this.snackBar.open('Xoá trạng thái thành công', '', {
            duration: 2500
          });
          this.deletePostEvent.emit(response);
        }, error => {
          this.snackBar.open('Xoá trạng thái không thành công', '', {
            duration: 2500
          });
          console.log(error);
        });
      }
    });
  }

  getComment(postId: number): void {
    if (this.toggleCommentList) {
      this.toggleCommentList = false;
      this.commentList = [];
    } else {
      this.toggleCommentList = true;
      this.postService.getCommentsByPost(postId).subscribe(response => {
        this.commentList = response;
        if (this.commentList.length === 0) {
          this.snackBar.open('Bài viết không có bình luận', '', {
            duration: 2500
          });
        }
      });
    }
  }

  updateCommentList(comment: IComment): void {
    this.commentList.push(comment);
  }
}