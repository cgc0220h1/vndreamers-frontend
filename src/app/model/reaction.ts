import {IPost} from './Post';
import {IUser} from './User';

export interface IReaction {
  id?: number;
  status?: number;
  post?: IPost;
  user?: IUser;
}
