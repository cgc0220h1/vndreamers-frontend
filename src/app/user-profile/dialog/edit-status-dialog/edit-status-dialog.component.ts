import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PostSingleComponent} from '../../post/post-single/post-single.component';

@Component({
  selector: 'app-edit-status-dialog',
  templateUrl: './edit-status-dialog.component.html',
  styleUrls: ['./edit-status-dialog.component.scss']
})
export class EditStatusDialogComponent implements OnInit {

  title: string;
  label: string;

  constructor(public matDialogRef: MatDialogRef<PostSingleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.label = this.data.label;
  }

}
