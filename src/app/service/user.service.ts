import {Injectable} from '@angular/core';
import {IUser} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;

  constructor() {
  }

  getUserLoggedIn(): IUser {
    const dataLocalStorage = localStorage.getItem('user');
    this.user = JSON.parse(dataLocalStorage);
    return this.user;
  }
}
