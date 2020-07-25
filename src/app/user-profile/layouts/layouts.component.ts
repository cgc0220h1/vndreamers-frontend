import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      panelClass: 'custom-dialog',
      hasBackdrop: false
    });
  }
}
