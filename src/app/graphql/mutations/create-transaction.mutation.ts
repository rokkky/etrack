import { gql } from 'apollo-angular';
import {
  CreateTransactionResponse,
  CreateTransactionVariables,
} from '../types/create-transaction.types';

export const CREATE_TRANSACTION = gql<
  CreateTransactionResponse,
  CreateTransactionVariables
>`
  mutation createTransaction($input: CreateTransactionInput) {
    createTransaction(input: $input) {
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
