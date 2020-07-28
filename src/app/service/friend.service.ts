import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../model/User';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) {
  }

  sendFriendRequest(userRequest: IUser): Observable<any> {
    return this.http.post<any>(`${apiUrl}/api/friends`, userRequest);
  }
}
