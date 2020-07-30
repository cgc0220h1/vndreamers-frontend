import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/public/auth.service';
import {IUser} from '../../model/User';
// import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // admin: BehaviorSubject<IUser>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.admin = this.authService.currentUserSubject;
  }

}
