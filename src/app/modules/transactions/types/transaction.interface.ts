import { ITransactionCategory } from './transaction-category.interface';
import { TransactionTypes } from './transaction-types.enum';

export interface ITransaction {
  id: string;
  type: TransactionTypes;
  category: ITransactionCategory;
  date: Date;
  description: string;
  amount: number;
}
