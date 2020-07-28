import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../model/User';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IFriendRequest} from '../model/friend-request';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) {
  }

  sendFriendRequest(userRequest: IUser): Observable<IFriendRequest> {
    return this.http.post<IFriendRequest>(`${apiUrl}/api/friends`, userRequest);
  }

  getUserRequest(): Observable<IFriendRequest[]> {
    return this.http.get<IFriendRequest[]>(`${apiUrl}/api/friends/receive`);
  }
}
