import { gql } from 'apollo-angular';
import {
  CreateCategoryResponse,
  CreateCategoryVariables,
} from '../types/create-category.types';
export const CREATE_CATEGORY = gql<
  CreateCategoryResponse,
  CreateCategoryVariables
>`
  mutation createCategory($input: CreateCategoryInput) {
    createCategory(input: $input) {
      id
      user
      name
      type
    }
  }
`;
