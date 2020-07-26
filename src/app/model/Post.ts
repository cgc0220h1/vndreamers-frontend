import {IUser} from './User';
import {Time} from './time';

export interface IPost {
  id?: number;
  image?: string;
  content: string;
  status: number;
  createDate?: string;
  user?: IUser;
}
