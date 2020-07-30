import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IPost} from '../../../model/Post';
import {IUser} from '../../../model/User';
import {IComment} from '../../../model/comment';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PostService} from '../../../service/post.service';
import {IReaction} from '../../../model/reaction';
import {EditStatusDialogComponent} from "../../dialog/edit-status-dialog/edit-status-dialog.component";

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostSingleComponent implements OnInit {
  commentList: IComment[] = [];
  reaction: IReaction;
  reactionList: IReaction[] = [];
  numberOfReaction = 0;
  toggleCommentList = false;
  isLikePost = false;
  toggleEditForm = false;

  @Input()
  postData: IPost;

  @Input()
  otherUser: IUser;

  @Input()
  userLogged: IUser;

  @Output()
  deletePostEvent = new EventEmitter();

  status: string;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private postService: PostService) {
  }

  ngOnInit(): void {
    if (this.postData.status === 1) {
      this.status = 'language';
    } else if (this.postData.status === 2) {
      this.status = 'people_alt';
    } else {
      this.status = 'lock';
    }
    this.postService.getReaction(this.postData.id).subscribe(next => {
      this.reactionList = next.filter(currentReaction => currentReaction.status === 1);
      this.numberOfReaction = this.reactionList.length;
    });
  }

  deletePost(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Bạn có muốn xoá trạng thái này ?',
        label: 'Xoá trạng thái'
      }
    });
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

  doLikeThisPost(): void {
    if (!this.isLikePost) {
      this.reaction = {
        status: 1
      };
      this.postService.likePost(this.postData.id, this.reaction).subscribe(next => {
        console.log(next);
        this.snackBar.open('Bạn đã thích bài viết ' + this.postData.content, '', {
          duration: 1000
        });
        this.numberOfReaction++;
        this.isLikePost = true;
      }, error => {
        console.log(error);
        this.snackBar.open('Bạn đã thích bài viết này rồi!', '', {
          duration: 1000
        });
      });
    } else {
      this.postService.unlikePost(this.postData.id).subscribe(next => {
        console.log(next);
        this.snackBar.open('Bạn đã bỏ thích bài viết ' + this.postData.content, '', {
          duration: 1000
        });
        this.numberOfReaction--;
        this.isLikePost = false;
      }, error => {
        console.log(error);
        this.snackBar.open('Có lỗi xảy ra ', '', {
          duration: 1000
        });
      });
    }
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
        title: 'Bạn có muốn xoá ảnh này ?',
        label: 'Xoá ảnh'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'delete':
          this.postData.image = '';
          this.postService.updatePost(this.postData).subscribe(post => {
            this.snackBar.open('Xoá ảnh thành công', '', {
              duration: 2500
            });
            console.log('xoa anh thanh cong');
          });
          break;
        case 'cancel':
          this.snackBar.open('Huỷ xoá ảnh', '', {
            duration: 2500
          });
      }
    });
  }

  changeContent(): void {
    this.postData.content = document.getElementById('content')['value'];
    this.postService.updatePost(this.postData).subscribe(result => {
      console.log('update thanh cong');
      this.toggleForm();
    }, error => {
      console.log('update content error !');
    });
  }

  openEditStatusPrompt(status: number): void {
    const dialogRef = this.dialog.open(EditStatusDialogComponent, {
      data: {
        title: 'Bạn có muốn đổi trạng thái ?',
        label: 'Đổi trạng thái'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'edit':
          this.postData.status = status;
          this.postService.updatePost(this.postData).subscribe(post => {
            this.snackBar.open('Đổi trạng thái thành công', '', {
              duration: 2500
            });
            console.log('Đổi trạng thái thành công');
            this.status = post.status;
            if (this.status === 1) {
              this.status = 'language';
            } else if (this.status === 2) {
              this.status = 'people_alt';
            } else {
              this.status = 'lock';
            }
            console.log(this.postData);
          });
          break;
        case 'cancel':
          this.snackBar.open('Huỷ đổi trạng thái', '', {
            duration: 2500
          });
      }
    });
  }
}
