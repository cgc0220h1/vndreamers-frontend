import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IUser} from '../model/User';
import {map} from 'rxjs/operators';

const apiUrl = 'https://vndreamers-dev.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  shouldRefresh = new Subject<any>();

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(apiUrl + '/auth/register', user);
  }

  login(email, password): Observable<any> {

    return this.httpClient.post<any>(`${environment.apiSource}/auth/login`, {email, password})
      .pipe(map(iAccount => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('access_token', iAccount.access_token);
        this.currentUserSubject.next(iAccount);
        return iAccount;
      }));

    //  return this.httpClient.post<IUser>(apiUrl + '/auth/login', user);
  }
}
