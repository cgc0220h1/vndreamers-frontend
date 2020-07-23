import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../service/api.service';
import {DatePipe} from '@angular/common';
import {IUser} from '../model/User';
import {regex} from '../../assets/regex';


function comparePassword(c: AbstractControl): any {
  new DatePipe('en').transform(this.birthday.value, 'dd/MM/yyyy');
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordNotMatch: true
  };
}

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  loginForm: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);

  signUpForm: FormGroup;
  isShowSuccess = false;
  message: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService) {
  }

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  firstNameRegx = /\p{L}{3,32}/ui;
  lastNameRegx = /\p{L}{3,32}/ui;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required,
          Validators.pattern(regex.emailRegx)]],
        password: ['', [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(regex.passwordRegx)]],
        rememberMe: false
      }
    );
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern(regex.shortNameRegex)]],
        lastName: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern(regex.shortNameRegex)]],
        email: ['', [Validators.required, Validators.pattern(regex.emailRegx)]],
        password: ['', [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(regex.passwordRegx)]],
        confirmPassword: ['', [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(regex.passwordRegx)]],
        gender: ['', [Validators.required]],
        birthday: ['']
      }
    );
  }

  onSubmitSignIn(): void {
  }


  onSubmitSignUp(): void {
    const userRegistered: IUser = {
      birth_date: this.signUpForm.get('birthday').value,
      confirm_password: this.signUpForm.get('confirmPassword').value,
      email: this.signUpForm.get('email').value,
      first_name: this.signUpForm.get('firstName').value,
      gender: this.signUpForm.get('gender').value,
      last_name: this.signUpForm.get('lastName').value,
      password: this.signUpForm.get('password').value
    };
    this.apiService.createUser(userRegistered).subscribe(result => {
        console.log(result);
        this.apiService.shouldRefresh.next(result);
      }
    );
  }

}
