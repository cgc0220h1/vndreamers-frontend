import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';
import {AuthService} from '../../service/auth.service';
import {IUser} from '../../model/User';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  user: IUser;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUserLoggedIn();
  }

  openEditProfileDialog(): void {
    if (this.user === null) {
      return;
    }
    this.dialog.open(EditProfileComponent, {
      panelClass: 'custom-dialog',
      hasBackdrop: false,
      data: this.user
    });
  }
}
