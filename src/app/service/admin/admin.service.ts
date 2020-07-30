import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../model/User';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {
  }

  getAllUser(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${apiUrl}/api/admin/users`);
  }

  getUserById(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${apiUrl}/api/admin/users/${id}`);
  }

  blockActiveUser(user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${apiUrl}/api/admin/users/status`, user);
  }

  getUsersRegisterToday(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${apiUrl}/api/admin/users/statistics/today`);
  }
}
