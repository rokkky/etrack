import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LOGIN } from 'src/app/graphql/mutations/login.mutation';
import { SIGNUP } from 'src/app/graphql/mutations/signup.mutation';
import { LogInFormInput, SignUpFormInput } from '../types/forms.interface';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import {
  LoginResponse,
  LoginVariables,
} from 'src/app/graphql/types/login.types';
import {
  SignupResponse,
  SignupVariables,
} from 'src/app/graphql/types/signup.types';
import { IToken } from '../types/token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  login(data: LogInFormInput) {
    return this.apiService
      .mutate<LoginResponse, LoginVariables>(LOGIN, { input: data })
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
    return this.apiService.mutate<SignupResponse, SignupVariables>(SIGNUP, {
      input: data,
    });
  }

  isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('accessToken');
      return !!token;
    } catch (e) {
      return false;
    }
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  private setSession(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', jwtDecode<IToken>(accessToken).sub);
  }
}
