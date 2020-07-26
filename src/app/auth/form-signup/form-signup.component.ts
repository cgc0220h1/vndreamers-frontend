import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {IUser} from '../../model/User';
import {regex} from '../../../assets/regex';
import {AuthService} from '../../service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observer} from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!((control && control.touched && control.invalid));
  }
}

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss'],
  providers: [MatSnackBar]
})
export class FormSignupComponent implements OnInit {
  matcher: ErrorStateMatcher;
  signUpForm: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);
  formObserver: Observer<any> = {
    next: () => {
      this.snackBar.open('Đăng ký thành công', '', {
        duration: 2500
      });
      this.signUpForm.reset();
    },
    error: () => {
      this.snackBar.open('Đăng ký không thành công', '', {
        duration: 2500
      });
    },
    complete: () => {
    }
  };

  constructor(private formBuilder: FormBuilder,
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
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
          Validators.pattern(regex.shortNameRegex)]],
        lastName: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
          Validators.pattern(regex.shortNameRegex)]],
        email: ['', [Validators.required, Validators.email]],
        pwGroup: this.formBuilder.group({
          password: ['', [Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
            Validators.pattern(regex.passwordRegx)]],
          confirmPassword: [''],
        }, {validators: FormSignupComponent.comparePassword}),
        gender: ['', [Validators.required]],
        birthday: ['', [Validators.required]]
      }
    );
  }

  onSubmitSignUp(): void {
    console.log(this.signUpForm.value);
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      const userRegistered = FormSignupComponent.toUserRegistered(this.signUpForm);
      this.authService.createUser(userRegistered).subscribe(this.formObserver);
    }
  }
}
