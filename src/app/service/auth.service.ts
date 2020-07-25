import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IUser} from '../model/User';
import {map} from 'rxjs/operators';

const apiUrl = environment.apiSource;

// const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject = new BehaviorSubject<IUser>(null);

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(apiUrl + '/auth/register', user);
  }

  login(email, password): Observable<any> {
    return this.httpClient.post<any>(`${apiUrl}/auth/login`, {email, password})
      .pipe(map(iAccount => {
        localStorage.setItem('access_token', iAccount.access_token);
        return iAccount;
      }));
  }
}
