import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../service/auth.service';
import {regex} from '../../../assets/regex';
import {IUser} from '../../model/User';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!((control && control.touched && control.invalid));
  }
}

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  providers: [MatSnackBar]
})
export class FormLoginComponent implements OnInit {
  loginForm: FormGroup;
  matcher: ErrorStateMatcher;
  response: {
    user: IUser,
    access_token: string
  };

  username: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private matSnackBar: MatSnackBar) {
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
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

  onSubmitSignIn(): void {
    this.matSnackBar.open('Vui lòng đợi giây lát', '', {
      duration: 2500
    });
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(response => {
      this.authService.currentUserSubject.next(response.user);
      this.username = response.user.username;
      // this.authService.shouldRefresh.next(response.user);
      this.router.navigateByUrl(this.username).then(r => console.log(r));
    }, error => {
      this.matSnackBar.open(error.error.error, '', {
        duration: 2500
      });
    });
  }
}
