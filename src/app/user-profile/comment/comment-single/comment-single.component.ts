import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../model/comment';

@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.scss']
})
export class CommentSingleComponent implements OnInit {
  @Input()
  comment: IComment;

  constructor() { }

  ngOnInit(): void {
  }

}
