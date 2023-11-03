import { ITransaction } from 'src/app/modules/transactions/types/transaction.interface';

export interface CreateTransactionResponse {
  createTransaction: ITransaction;
}

export interface CreateTransactionVariables {
  input: {
    date: Date;
    amount: number;
    description: string;
    user: string;
    type: string;
    category: string;
  };
}
