import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { LOGIN } from 'src/app/graphql/mutations/login.mutation';
import { SIGNUP } from 'src/app/graphql/mutations/signup.mutation';
import { LogInFormInput, SignUpFormInput } from '../types/forms.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private apollo: Apollo) {}

  login(data: LogInFormInput) {
    return this.apollo
      .mutate({
        mutation: LOGIN,
        variables: { input: data },
      })
      .pipe(
        map((res) => {
          if (res.data) {
            const { accessToken, refreshToken } = res.data.logIn;
            this.setSession(accessToken, refreshToken);
          }
          return res;
        }),
      );
  }

  signup(data: SignUpFormInput) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: { input: data },
    });
  }

  private setSession(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
}
