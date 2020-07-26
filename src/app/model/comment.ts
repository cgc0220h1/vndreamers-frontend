import {IUser} from './User';

export interface IComment {
  id?: number;
  content?: string;
  user?: IUser;
}
