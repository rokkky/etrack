import { gql } from 'apollo-angular';
import { GetUserResponse, GetUserVariables } from '../types/user.types';

export const GET_USER = gql<GetUserResponse, GetUserVariables>`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      username
      email
      registrationDate
    }
  }
`;
