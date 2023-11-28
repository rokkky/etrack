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
import { ITransactionCategoryCreation } from '../types/transaction-category.interface';
import {
  CreateCategoryResponse,
  CreateCategoryVariables,
} from 'src/app/graphql/types/create-category.types';
import { CREATE_CATEGORY } from 'src/app/graphql/mutations/create-category.mutation';
import { of } from 'rxjs';
import {
  EditTransactionResponse,
  EditTransactionVariables,
} from 'src/app/graphql/types/edit-transaction.types';
import { EDIT_TRANSACTION } from 'src/app/graphql/mutations/edit-transaction.mutation';
import { DELETE_TRANSACTION } from 'src/app/graphql/mutations/delete-transaction.mutation';
import { DeleteTransactionResponse, DeleteTransactionVariables } from 'src/app/graphql/types/delete-transaction.types';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private api: ApiService,
    private storage: StorageService,
  ) {}

  getUserCategories() {
    const userId = this.getUserId();
    return this.api.query<
      GetUserCategoriesResponse,
      GetUserCategoriesVariables
    >(GET_USER_CATEGORIES, { userId: userId });
  }

  getTransactions(filterState: IFilterState, type: string) {
    const userId = this.getUserId();
    return this.api.query<IGetTransactionsResponse, IGetTransactionsVariables>(
      GET_TRANSACTIONS,
      { input: { filter: filterState, user: userId, type } },
      true,
    );
  }

  createCategory(input: ITransactionCategoryCreation) {
    const userId = this.getUserId();
    return this.api.mutate<CreateCategoryResponse, CreateCategoryVariables>(
      CREATE_CATEGORY,
      { input: { ...input, user: userId } },
    );
  }

  createTransaction(input: ITransactionFormInput) {
    const userId = this.getUserId();
    return this.api.mutate<
      CreateTransactionResponse,
      CreateTransactionVariables
    >(CREATE_TRANSACTION, { input: { ...input, user: userId } });
  }

  editTransaction(input: ITransactionFormInput) {
    const userId = this.getUserId();
    return this.api.mutate<EditTransactionResponse, EditTransactionVariables>(
      EDIT_TRANSACTION,
      { input: { ...input, user: userId } },
    );
  }

  deleteTransaction(id: string) {
    return this.api.mutate<
      DeleteTransactionResponse,
      DeleteTransactionVariables
    >(DELETE_TRANSACTION, { id });
  }

  private getUserId(): string {
    return this.storage.getItem('userId');
  }
}
