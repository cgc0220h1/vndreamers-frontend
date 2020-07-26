import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../model/Post';
import {PostService} from '../../service/post.service';
import {IUser} from '../../model/User';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialog/delete-dialog/delete-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IComment} from '../../model/comment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() posts: IPost[];
  @Input() user: IUser;
  commentList: Comment[];

  constructor(private postService: PostService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(next => {
      this.posts = next;
      this.posts.reverse();
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });

    this.postService.shouldRefresh.subscribe(result => {
      if (result !== null) {
        this.posts.unshift(result);
      }
    });

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
          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === response.id) {
              this.posts.splice(i, 1);
            }
          }
        }, error => {
          this.snackBar.open('Xoá trạng thái không thành công', '', {
            duration: 2500
          });
          console.log(error);
        });
      }
    });
  }

  getComment(id: number): void {

  }

  updateCommentList(comment: IComment): void {
    console.log('parent');
    console.log(comment);
  }
}
