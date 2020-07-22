import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  loginForm: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);
  email: string;
  password: string;
  confirmpassword: string;
  firstname: string;
  lastname: string;
  gender: number;
  birthday: string;

  // tslint:disable-next-line:typedef
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  passwordRegx = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
  firstnameRegx = /^[a-z]{3,32}$/i;
  lastnameRegx = /^[a-z]{3,32}$/i;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
        password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(this.passwordRegx)]],
        rememberMe: false
      }
    );
    this.signUpForm = this.formBuilder.group(
      {
        firstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern(this.firstnameRegx)]],
        lastname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern(this.lastnameRegx)]],
        email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
        password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(this.passwordRegx)]],
        // tslint:disable-next-line:max-line-length
        confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(this.passwordRegx)]],
        gender: [null, [Validators.required]],
        birthday: [1, [Validators.required]]
      }
    );
  }
  // tslint:disable-next-line:typedef
  onSubmitSignIn() {
  }

  // tslint:disable-next-line:typedef
  onSubmitSignUp() {}

}
