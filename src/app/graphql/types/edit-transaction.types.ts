import { ITransaction } from 'src/app/modules/transactions/types/transaction.interface';

export interface EditTransactionResponse {
  editTransaction: ITransaction;
}

export interface EditTransactionVariables {
  input: {
    date: Date;
    amount: number;
    description: string;
    user: string;
    type: string;
    category: string;
  };
}
