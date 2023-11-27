import { TransactionTypes } from './transaction-types.enum';

export interface ITransactionCategory extends ITransactionCategoryCreation {
  id: string;
  user: string;
}

export interface ITransactionCategoryCreation {
  name: string;
  type: TransactionTypes;
}
