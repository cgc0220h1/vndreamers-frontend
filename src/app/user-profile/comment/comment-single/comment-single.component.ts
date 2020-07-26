import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.scss']
})
export class CommentSingleComponent implements OnInit {
  @Input()
  comment: Comment;

  constructor() { }

  ngOnInit(): void {
  }

}
