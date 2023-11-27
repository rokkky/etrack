import { ITransactionCategory } from 'src/app/modules/transactions/types/transaction-category.interface';

export interface CreateCategoryResponse {
  createCategory: ITransactionCategory;
}

export interface CreateCategoryVariables {
  input: {
    name: string;
    type: string;
    user: string;
  };
}
