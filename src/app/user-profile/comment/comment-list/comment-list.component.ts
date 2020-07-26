import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../model/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input()
  commentOfPost: IComment[];

  constructor() {
  }

  ngOnInit(): void {
  }
}
