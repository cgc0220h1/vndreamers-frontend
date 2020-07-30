import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {IUser} from '../../model/User';
import {AuthService} from '../../service/public/auth.service';
import {AdminService} from '../../service/admin/admin.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  term: string;

  users: IUser[];
  admin: IUser;

  constructor(private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.adminService.getAllUser().subscribe(users => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  blockUser(user: IUser): void {
    user.status = 0;
    if (confirm('Do you really want to block this user?')) {
      this.adminService.blockActiveUser(user).subscribe(result => {
        console.log('block ok');
        this.adminService.getAllUser().subscribe(result2 => {
          this.users = result2;
        });
      }, error => console.log(error));
    }
  }

  activeUser(user: IUser): void {
    user.status = 1;
    if (confirm('Do you really want to unblock this user?')) {
      this.adminService.blockActiveUser(user).subscribe(result => {
        console.log('active ok');
        this.adminService.getAllUser().subscribe(result1 => {
         this.users = result1;
       });
      }, error => console.log(error));
    }
  }

}
