import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {IUser} from '../model/User';

const apiUrl = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  shouldRefresh = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    console.log(environment.apiSource);
  }
  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(apiUrl + '/auth/register', user);
  }
}
