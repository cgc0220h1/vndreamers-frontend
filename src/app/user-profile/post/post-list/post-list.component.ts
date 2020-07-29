import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../../model/Post';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() posts: IPost[];
  @Input() userRequest: IUser;
  @Input() currentUser: IUser;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(next => {
      console.log(next);
      this.posts = next;
      // this.posts.reverse();
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });

    // this.postService.shouldRefresh.subscribe(result => {
    //   if (result !== null) {
    //     this.posts.unshift(result);
    //   }
    // });

  }

  removePost(post: any): void {
    console.log(post);
    this.posts = this.posts.filter(currentPost => currentPost.id !== post.id);
  }
}
