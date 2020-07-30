import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IPost} from '../../../model/Post';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges {

  @Input() posts: IPost[];
  @Input() userRequest: IUser;
  @Input() currentUser: IUser;

  constructor(private postService: PostService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.postService.getPosts().subscribe(next => {
      console.log(next);
      this.posts = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  ngOnInit(): void {
  }

  removePost(post: any): void {
    console.log(post);
    this.posts = this.posts.filter(currentPost => currentPost.id !== post.id);
  }
}
