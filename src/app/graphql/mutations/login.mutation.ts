import { gql } from 'apollo-angular';
import { LoginResponse, LoginVariables } from '../types/login.types';

export const LOGIN = gql<LoginResponse, LoginVariables>`
  mutation logIn($input: LogInInput) {
    logIn(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
