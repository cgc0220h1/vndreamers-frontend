import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../model/User';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {
  @Input() user: IUser;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
