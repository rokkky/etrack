import { gql } from 'apollo-angular';
import {
  EditTransactionResponse,
  EditTransactionVariables,
} from '../types/edit-transaction.types';

export const EDIT_TRANSACTION = gql<
  EditTransactionResponse,
  EditTransactionVariables
>`
  mutation editTransaction($input: EditTransactionInput) {
    editTransaction(input: $input) {
      id
      date
      amount
      description
      type
      category {
        id
        name
      }
    }
  }
`;
