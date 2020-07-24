import {IUser} from './User';

export interface IPost {
  id?: number;
  image?: string;
  content: string;
  status: number;
  timePost?: string;
  user?: IUser;
}
