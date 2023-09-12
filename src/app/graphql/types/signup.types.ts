export interface SignupResponse {
  signUp: true;
}

export interface SignupVariables {
  input: {
    username?: string;
    email: string;
    password: string;
  };
}
