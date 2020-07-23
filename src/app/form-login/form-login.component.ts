import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../service/api.service';
import {AlertService} from '../service/alert.service';
import {first} from 'rxjs/operators';


// tslint:disable-next-line:typedef
function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
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
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService,
              private alertService: AlertService) { }

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  passwordRegx = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
  firstnameRegx = /^[a-z]{3,32}$/i;
  lastnameRegx = /^[a-z]{3,32}$/i;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(this.passwordRegx)]],
        rememberMe: false
      }
    );
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern(this.firstnameRegx)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern(this.lastnameRegx)]],
        email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(this.passwordRegx)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32),
          Validators.pattern(this.passwordRegx)]],
        gender: ['', [Validators.required]],
        birthday: ['', [Validators.required]]
      }
    );
  }
  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.signUpForm.controls; }
  // tslint:disable-next-line:typedef
  onSubmitSignIn() {
  }


  // tslint:disable-next-line:typedef
  onSubmitSignUp() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    this.apiService.createUser(this.signUpForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successfully', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
