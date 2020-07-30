import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {IUser} from '../../model/User';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  users: IUser[];


  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.userService.getAllUser().subscribe(users => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

}
