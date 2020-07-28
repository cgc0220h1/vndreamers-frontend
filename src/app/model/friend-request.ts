import {IUser} from './User';

export interface IFriendRequest {
  id?: number;
  status?: number;
  user_send: IUser;
  user_request: IUser;
}
