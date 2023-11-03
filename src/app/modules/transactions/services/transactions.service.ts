import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { GET_USER_CATEGORIES } from 'src/app/graphql/query/get-user-categories.query';
import { StorageService } from '../../core/services/storage.service';
import {
  GetUserCategoriesResponse,
  GetUserCategoriesVariables,
} from 'src/app/graphql/types/get-user-categories.types';
import { CREATE_TRANSACTION } from 'src/app/graphql/mutations/create-transaction.mutation';
import {
  CreateTransactionResponse,
  CreateTransactionVariables,
} from 'src/app/graphql/types/create-transaction.types';
import { ITransactionFormInput } from '../types/transaction-form-input.interface';
import { IFilterState } from '../types/filter-state.interface';
import {
  IGetTransactionsResponse,
  IGetTransactionsVariables,
} from 'src/app/graphql/types/get-transactions.types';
import { GET_TRANSACTIONS } from 'src/app/graphql/query/get-transactions.query';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private api: ApiService,
    private storage: StorageService,
  ) {}

  getUserCategories() {
    const userId = this.storage.getItem('userId');
    return this.api.query<
      GetUserCategoriesResponse,
      GetUserCategoriesVariables
    >(GET_USER_CATEGORIES, { userId: userId });
  }

  getTransactions(filterState: IFilterState, type: string) {
    const userId = this.storage.getItem('userId');
    return this.api.query<IGetTransactionsResponse, IGetTransactionsVariables>(
      GET_TRANSACTIONS,
      { input: { filter: filterState, user: userId, type } },
      true,
    );
  }

  createTransaction(input: ITransactionFormInput) {
    const userId = this.storage.getItem('userId');
    return this.api.mutate<
      CreateTransactionResponse,
      CreateTransactionVariables
    >(CREATE_TRANSACTION, { input: { ...input, user: userId } });
  }
}