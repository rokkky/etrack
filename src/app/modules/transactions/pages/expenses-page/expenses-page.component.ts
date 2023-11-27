import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionFormModalComponent } from 'src/app/modules/transactions/components/transaction-form-modal/transaction-form-modal.component';
import {
  ITransactionCategory,
  ITransactionCategoryCreation,
} from 'src/app/modules/transactions/types/transaction-category.interface';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionTypes } from '../../types/transaction-types.enum';
import { ITransaction } from '../../types/transaction.interface';
import { Subject, filter, mergeMap, switchMap } from 'rxjs';
import { IFilterState } from '../../types/filter-state.interface';
import { DEFAULT_MODAL_CONFIG } from '../../components/transactions-table/transactions-table.component';

@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.scss'],
})
export class ExpensesPageComponent implements OnInit {
  private transactionsApiCall$: Subject<IFilterState> = new Subject();
  expenses!: ITransaction[];
  categories: ITransactionCategory[] = [];
  currentCategories: ITransactionCategory[] = [];
  displayingCategory = TransactionTypes.expense;
  filterState!: IFilterState;
  paginatorLength: number = 0;
  isLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private transactionsService: TransactionsService,
  ) {}

  ngOnInit(): void {
    this.transactionsService.getUserCategories().subscribe((res) => {
      this.categories = res.data?.getUserCategories;
      this.currentCategories = this.sortCategories(this.displayingCategory);
    });

    this.transactionsApiCall$
      .pipe(
        switchMap((filter) => {
          return this.transactionsService.getTransactions(
            filter,
            this.displayingCategory,
          );
        }),
      )
      .subscribe((res) => {
        this.expenses = res.data.getTransactions.transactions;
        this.paginatorLength = res.data.getTransactions.transactionsLength;
        this.isLoading = false;
      });
  }

  openAddExpenseModal(): void {
    const dialogRef = this.dialog.open(TransactionFormModalComponent, {
      data: {
        categories: this.currentCategories,
        transactionType: TransactionTypes.expense,
      },
      ...DEFAULT_MODAL_CONFIG,
    });
    const componentInstance = dialogRef.componentInstance;

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        mergeMap((data) => this.transactionsService.createTransaction(data)),
      )
      .subscribe(() => this.getTransactionsList(this.filterState));

    componentInstance.categoryTypeChanged.subscribe(
      (type: TransactionTypes) => {
        this.currentCategories = this.sortCategories(type);
        componentInstance.categories = this.currentCategories;
        componentInstance.setCategory();
      },
    );
    componentInstance.categoryAdded
      .pipe(
        mergeMap((categoryData: ITransactionCategoryCreation) =>
          this.transactionsService.createCategory(categoryData),
        ),
      )
      .subscribe((res) => {
        const category = res.data!.createCategory;
        this.categories = [...this.categories, category];
        this.currentCategories = this.sortCategories(category.type);
        componentInstance.categories = this.currentCategories;
        componentInstance.setCategory(category.name);
      });
  }

  getTransactionsList(filterState: IFilterState): void {
    this.isLoading = true;
    this.filterState = filterState;
    this.transactionsApiCall$.next(this.filterState);
  }

  private sortCategories(type: string): ITransactionCategory[] {
    return this.categories.filter((cat) => {
      return cat.type === type;
    });
  }
}
