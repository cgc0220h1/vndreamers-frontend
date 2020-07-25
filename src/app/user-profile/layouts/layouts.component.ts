import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {IUser} from "../../model/User";

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  user: IUser;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(response => {
      this.user = response;
    });
  }

  openEditProfileDialog(): void {
  }
}
