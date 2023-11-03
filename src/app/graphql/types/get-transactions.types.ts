import { IFilterState } from 'src/app/modules/transactions/types/filter-state.interface';
import { ITransaction } from 'src/app/modules/transactions/types/transaction.interface';

export interface IGetTransactionsVariables {
  input: {
    filter: IFilterState;
    user: string;
    type: string;
  };
}

export interface IGetTransactionsResponse {
  getTransactions: {
    transactions: ITransaction[];
    transactionsLength: number;
  };
}
