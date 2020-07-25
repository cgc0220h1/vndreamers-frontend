import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../model/User';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {regex} from '../../../assets/regex';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LayoutsComponent} from '../layouts/layouts.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  profile: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<LayoutsComponent>,
              @Inject(MAT_DIALOG_DATA) public user: IUser) {
  }

  ngOnInit(): void {
    this.profile = this.formBuilder.group({
      firstName: new FormControl(this.user.first_name,
        [Validators.pattern(regex.shortNameRegex), Validators.required]),
      lastName: new FormControl(this.user.last_name,
        [Validators.pattern(regex.shortNameRegex), Validators.required]),
      email: [{value: this.user.email, disabled: true}],
      birthDate: new FormControl(this.user.birth_date, Validators.required),
      username: new FormControl(this.user.username,
        [Validators.pattern(regex.username), Validators.required]),
      phone: new FormControl(this.user.phone, Validators.pattern(regex.phone)),
      address: new FormControl(this.user.address),
      aboutMe: new FormControl(this.user.about_me, Validators.maxLength(255))
    });
  }

  updateProfile(): void {
    this.profile.markAllAsTouched();
    if (this.profile.valid) {
      const userInfo = this.getUserInfoByForm();
      this.dialogRef.close(userInfo);
    }
  }

  private getUserInfoByForm(): Partial<IUser> {
    return {
      id: this.user.id,
      first_name: this.profile.get('firstName').value,
      last_name: this.profile.get('lastName').value,
      email: this.profile.get('email').value,
      birth_date: this.profile.get('birthDate').value,
      username: this.profile.get('username').value,
      address: this.profile.get('address').value,
      phone: this.profile.get('phone').value,
      about_me: this.profile.get('aboutMe').value
    };
  }
}
