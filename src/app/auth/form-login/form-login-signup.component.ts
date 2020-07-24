import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observer} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {IUser} from '../../model/User';
import {regex} from '../../../assets/regex';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!((control && control.touched && control.invalid));
  }
}

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login-signup.component.html',
  styleUrls: ['./form-login-signup.component.scss'],
  providers: [MatSnackBar]
})
export class FormLoginSignupComponent implements OnInit {
  loginForm: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);
  signUpForm: FormGroup;
  isShowSuccess = false;
  message: string;
  matcher: ErrorStateMatcher;
  formObserver: Observer<any> = {
    next: () => {
      this.snackBar.open('Register Successful', '', {
        duration: 2500
      });
      this.signUpForm.reset();
    },
    error: () => {
      this.snackBar.open('Register Unsuccessful', '', {
        duration: 2500
      });
    },
    complete: () => {
    }
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.matcher = new MyErrorStateMatcher();
  }

  private static toUserRegistered(signUpForm: FormGroup): IUser {
    return {
      birth_date: signUpForm.get('birthday').value,
      confirm_password: signUpForm.get('pwGroup').get('confirmPassword').value,
      email: signUpForm.get('email').value,
      first_name: signUpForm.get('firstName').value,
      gender: signUpForm.get('gender').value,
      last_name: signUpForm.get('lastName').value,
      password: signUpForm.get('pwGroup').get('password').value
    };
  }

  private static comparePassword(c: AbstractControl): ValidationErrors | null {
    const v = c.value;
    return (v.password === v.confirmPassword) ? null : {
      passwordNotMatch: true
    };
  }

  ngOnInit(): void {
    this.initLoginForm();
    this.initSignupForm();
  }

  onSubmitSignIn(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(result => {
      console.log('ok');
    }, error => {
      console.log('error');
    });
  }

  onSubmitSignUp(): void {
    console.log(this.signUpForm.value);
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      const userRegistered = FormLoginSignupComponent.toUserRegistered(this.signUpForm);
      this.authService.createUser(userRegistered).subscribe(this.formObserver);
    }
  }

  private initSignupForm(): void {
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
        email: ['', [Validators.required, Validators.email]],
        pwGroup: this.formBuilder.group({
          password: ['', [Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
            Validators.pattern(regex.passwordRegx)]],
          confirmPassword: [''],
        }, {validators: FormLoginSignupComponent.comparePassword}),
        gender: ['', [Validators.required]],
        birthday: ['', [Validators.required]]
      }
    );
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required,
          Validators.email]],
        password: ['', [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(regex.passwordRegx)]],
      }
    );
  }

}
