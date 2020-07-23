export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: number;
  birthday: string;
  token?: string;
}
