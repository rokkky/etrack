import { gql } from 'apollo-angular';
import {
  IGetTransactionsResponse,
  IGetTransactionsVariables,
} from '../types/get-transactions.types';

export const GET_TRANSACTIONS = gql<
  IGetTransactionsResponse,
  IGetTransactionsVariables
>`
  query getTransactions($input: GetTransactionsInput) {
    getTransactions(input: $input) {
      transactions {
        id
        type
        date
        description
        amount
        category {
          id
          name
          type
        }
      }
      transactionsLength
    }
  }
`;
