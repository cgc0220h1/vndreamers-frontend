import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {IUser} from '../../model/User';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: IUser;
  sub: Subscription;

  gender1: string;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.userService.getUserById(id).subscribe(next => {
        this.user = next;
        if (this.user.gender === 1){
          this.gender1 = 'Nam';
        }else {
          this.gender1 = 'Nữ';
        }
      }, error => {console.log(error); this.user = null; });
    });
  }

}
