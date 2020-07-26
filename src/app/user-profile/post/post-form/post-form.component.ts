import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    status: new FormControl(''),
    content: new FormControl(''),
    image: new FormControl('')
  });

  @Input() user: IUser;

  constructor(private postService: PostService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.postService.shouldRefresh.subscribe(result => {
      this.postForm.reset();
    });
  }

  onSubmit(): void {
    this.postForm.value.status = 1;
    this.postService.createPost(this.postForm.value).subscribe(result => {
      this.snackBar.open('Post bài thành công', '', {
        duration: 2500
      });
      this.postService.shouldRefresh.next(result);
    }, error => {
      this.snackBar.open('Post bài không thành công', '', {
        duration: 2500
      });
      console.log(error);
    });
  }
}
