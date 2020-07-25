import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../model/User';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {regex} from '../../../assets/regex';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  user: IUser;
  profile: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.profile = this.formBuilder.group({
      first_name: new FormControl(this.user.first_name,
        [Validators.pattern(regex.shortNameRegex), Validators.required]),
      last_name: new FormControl(this.user.last_name,
        [Validators.pattern(regex.shortNameRegex), Validators.required]),
      birth_date: new FormControl(this.user.birth_date, Validators.required),
      username: new FormControl(this.user.username,
        [Validators.pattern(regex.username), Validators.required]),
      phone: new FormControl(this.user.phone),
      address: new FormControl(this.user.address),
      about_me: new FormControl(this.user.about_me)
    });
  }

}
