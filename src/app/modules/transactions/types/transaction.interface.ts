import { ITransactionCategory } from './transaction-category.interface';
import { TransactionTypes } from './transaction-types.enum';

export interface ITransaction {
  type: TransactionTypes;
  category: ITransactionCategory | string;
  date: Date;
  description: string;
  amount: number;
}
