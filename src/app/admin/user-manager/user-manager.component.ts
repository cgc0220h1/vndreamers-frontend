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
  admin: IUser;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.userService.getAllUser().subscribe(users => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  blockUser(id: number): void {
    if (confirm('Do you really want to block ?')) {
      this.userService.blockUser(id).subscribe(() => {
        console.log('block ok');
        this.userService.getAllUser().subscribe(result => {
          this.users = result;
        });
      }, error => console.log(error));
    }
  }

  activeUser(id: number): void {
    if (confirm('Do you really want to unblock ?')) {
      this.userService.activeUser(id).subscribe(() => {
        console.log('active ok');
        this.userService.getAllUser().subscribe(result1 => {
         this.users = result1;
       });
      }, error => console.log(error));
    }
  }

}
