import { gql } from 'apollo-angular';
import { SignupResponse, SignupVariables } from '../types/signup.types';

export const SIGNUP = gql<SignupResponse, SignupVariables>`
  mutation signUp($input: SignUpInput) {
    signUp(input: $input)
  }
`;
