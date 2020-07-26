import {IUser} from './User';

export interface IComment {
  id?: string;
  content?: string;
  user?: IUser;
}
