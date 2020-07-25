import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../model/User';

const API_URL = 'localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  shouldRefresh = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${API_URL}/${username}`);
  }

}
