export interface LoginResponse {
  logIn: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginVariables {
  input: {
    email: string;
    password: string;
  };
}
