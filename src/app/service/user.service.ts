import {Injectable} from '@angular/core';
import {IUser} from '../model/User';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const apiSource = environment.apiSource;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;

  shouldRefresh = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  getUserLoggedIn(): IUser {
    const dataLocalStorage = localStorage.getItem('user');
    this.user = JSON.parse(dataLocalStorage);
    return this.user;
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.httpClient.put((apiSource + '/api/users'), user);
  }

  getByUsername(username: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${apiSource}/api/users/${username}`);
  }
}
