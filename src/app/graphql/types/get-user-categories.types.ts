import { ITransactionCategory } from 'src/app/modules/transactions/types/transaction-category.interface';

export interface GetUserCategoriesResponse {
  getUserCategories: ITransactionCategory[];
}

export interface GetUserCategoriesVariables {
  userId: string;
}
