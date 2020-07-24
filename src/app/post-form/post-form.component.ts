import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostService} from '../service/post.service';

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

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.postForm.value.status = 1;
    console.log(this.postForm.value);
    this.postService.createPost(this.postForm.value).subscribe( result => {
      this.postService.shouldRefresh.next();
    }, error => {
      console.log('error');
    });
  }
}
