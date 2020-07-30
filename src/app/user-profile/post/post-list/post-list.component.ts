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

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  removePost(post: any): void {
    console.log(post);
    this.posts = this.posts.filter(currentPost => currentPost.id !== post.id);
  }
}
