import { gql } from 'apollo-angular';
import {
  RefreshTokenResponse,
  RefreshTokenVariables,
} from '../types/refresh-token.types';

export const REFRESH_TOKEN = gql<RefreshTokenResponse, RefreshTokenVariables>`
  mutation refreshToken($token: String) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;
