import { gql } from 'apollo-angular';
import {
  GetUserCategoriesResponse,
  GetUserCategoriesVariables,
} from '../types/get-user-categories.types';

export const GET_USER_CATEGORIES = gql<
  GetUserCategoriesResponse,
  GetUserCategoriesVariables
>`
  query getUserCategories($userId: ID) {
    getUserCategories(userId: $userId) {
      id
      name
      type
    }
  }
`;
