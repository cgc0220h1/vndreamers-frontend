import { Component, OnInit } from '@angular/core';
import {IPost} from '../../model/Post';
import {PostService} from '../../service/user/post.service';

@Component({
  selector: 'app-post-manager',
  templateUrl: './post-manager.component.html',
  styleUrls: ['./post-manager.component.scss']
})
export class PostManagerComponent implements OnInit {

  term: string;
  posts: IPost[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    }, error => {
      console.log(error);
    });
  }
}
