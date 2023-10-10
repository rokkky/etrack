import { IUser } from '../../profile/models/user.interface';

export interface IToken {
  sub: string;
  user: IUser;
}
