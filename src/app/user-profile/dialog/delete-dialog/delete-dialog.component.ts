import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {PostSingleComponent} from '../../post/post-single/post-single.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<PostSingleComponent>) {
  }

  ngOnInit(): void {
  }

}
