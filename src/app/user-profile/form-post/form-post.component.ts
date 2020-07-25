import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostService} from '../../service/post.service';
import {IUser} from '../../model/User';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    status: new FormControl(''),
    content: new FormControl(''),
    image: new FormControl('')
  });

  @Input() user: IUser;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.shouldRefresh.subscribe(result => {
      this.postForm.reset();
    });
  }

  onSubmit(): void {
    this.postForm.value.status = 1;
    this.postService.createPost(this.postForm.value).subscribe( result => {
      this.postService.shouldRefresh.next(result);
    }, error => {
      console.log('error create form');
    });
  }
}
