import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import {
  ChangeUsernameResponse,
  ChangeUsernameVariables,
  GetUserResponse,
  GetUserVariables,
} from 'src/app/graphql/types/user.types';
import { GET_USER } from 'src/app/graphql/query/get-user.query';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { CHANGE_USERNAME } from 'src/app/graphql/mutations/change-username.mutation';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private apiService: ApiService,
    private authService: AuthorizationService,
  ) {}

  getUserData(id: string) {
    return this.apiService.query<GetUserResponse, GetUserVariables>(GET_USER, {
      id,
    });
  }

  changeUsername(id: string, username: string) {
    return this.apiService.mutate<
      ChangeUsernameResponse,
      ChangeUsernameVariables
    >(CHANGE_USERNAME, {
      id,
      username,
    });
  }

  signOutUser(): void {
    this.authService.signOut();
  }
}
