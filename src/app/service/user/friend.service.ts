import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../model/User';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IFriendRequest} from '../../model/friend-request';

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

  getUserRequest(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${apiUrl}/api/friends/receive`);
  }

  getUserRequestTo(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${apiUrl}/api/friends/send`);
  }

  confirmRequest(friendRequest: IUser): Observable<IFriendRequest> {
    return this.http.put<IFriendRequest>(`${apiUrl}/api/friends`, friendRequest);
  }

  removeFriendship(id: number): Observable<IFriendRequest> {
    return this.http.delete<IFriendRequest>(`${apiUrl}/api/friends/${id}`);
  }

  getFriendList(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${apiUrl}/api/friends/${id}`);
  }
}
