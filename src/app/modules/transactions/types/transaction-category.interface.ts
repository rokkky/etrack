import { TransactionTypes } from './transaction-types.enum';

export interface ITransactionCategory {
  id: string;
  name: string;
  user: string;
  type: TransactionTypes;
}
