export interface RefreshTokenResponse {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenVariables {
  token: string;
}
