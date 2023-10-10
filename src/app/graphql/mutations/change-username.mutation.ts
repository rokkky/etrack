import { gql } from 'apollo-angular';
import {
  ChangeUsernameResponse,
  ChangeUsernameVariables,
} from '../types/user.types';

export const CHANGE_USERNAME = gql<
  ChangeUsernameResponse,
  ChangeUsernameVariables
>`
  mutation changeUsername($id: ID!, $username: String!) {
    changeUsername(id: $id, username: $username) {
      id
      username
      email
      registrationDate
    }
  }
`;
