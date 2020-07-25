import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';
import {AuthService} from '../../service/auth.service';
import {IUser} from '../../model/User';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  user: IUser;

  constructor(private authService: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(response => {
      this.user = response;
      // console.log(this.user);
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      panelClass: 'custom-dialog',
      hasBackdrop: false,
      data: this.user
    });
  }
}
