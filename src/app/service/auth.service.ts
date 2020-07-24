import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {IUser} from '../model/User';

const apiUrl = 'https://vndreamers-dev.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  shouldRefresh = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    console.log(environment.apiSource);
  }
  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(apiUrl + '/auth/register', user);
  }
  login(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(apiUrl + '/auth/login', user);
  }
}
