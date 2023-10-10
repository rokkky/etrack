import { IUser } from 'src/app/modules/profile/models/user.interface';

export interface GetUserResponse {
  getUser: IUser;
}

export interface GetUserVariables {
  id: string;
}

export interface ChangeUsernameResponse {
  changeUsername: IUser;
}

export interface ChangeUsernameVariables {
  id: string;
  username: string;
}
