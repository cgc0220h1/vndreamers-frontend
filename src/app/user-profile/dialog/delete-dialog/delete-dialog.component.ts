import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {PostListComponent} from '../../post-list/post-list.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<PostListComponent>) {
  }

  ngOnInit(): void {
  }

}
