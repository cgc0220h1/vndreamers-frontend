import { Component, OnInit } from '@angular/core';
import {IPost} from '../../model/Post';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: IPost[];
  constructor(private postService: PostService) { }


  ngOnInit(): void {
    this.postService.getPosts().subscribe(next => {
      this.posts = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
    this.postService.shouldRefresh.subscribe(result => {
      this.postService.getPosts().subscribe(results => {
        this.posts = results;
      }, error => {
        this.posts = [];
      });
    });
  }

}
