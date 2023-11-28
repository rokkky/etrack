import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../../types/transaction.interface';
import { IFilterState } from '../../types/filter-state.interface';
import { ITransactionCategory } from '../../types/transaction-category.interface';
import { TransactionTypes } from '../../types/transaction-types.enum';
import { Subject, filter, mergeMap, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionFormModalComponent } from '../../components/transaction-form-modal/transaction-form-modal.component';
import { DEFAULT_MODAL_CONFIG } from '../../components/transactions-table/transactions-table.component';

@Component({
  selector: 'app-incomes-page',
  templateUrl: './incomes-page.component.html',
  styleUrls: ['./incomes-page.component.scss'],
})
export class IncomesPageComponent implements OnInit {
  private transactionsApiCall$: Subject<IFilterState> = new Subject();
  incomes!: ITransaction[];
  categories: ITransactionCategory[] = [];
  currentCategories: ITransactionCategory[] = [];
  displayingCategory = TransactionTypes.income;
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
        this.incomes = res.data.getTransactions.transactions;
        this.paginatorLength = res.data.getTransactions.transactionsLength;
        this.isLoading = false;
      });
  }

  openAddIncomeModal(): void {
    const dialogRef = this.dialog.open(TransactionFormModalComponent, {
      data: {
        categories: this.currentCategories,
        transactionType: TransactionTypes.income,
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

    componentInstance.categoryTypeChanged.subscribe((type) => {
      this.currentCategories = this.sortCategories(type);
      componentInstance.categories = this.currentCategories;
      componentInstance.setCategory();
    });
  }

  openEditIncomeModal(transaction: ITransaction): void {
    console.log(transaction);
    const dialogRef = this.dialog.open(TransactionFormModalComponent, {
      data: {
        categories: this.currentCategories,
        transactionType: TransactionTypes.income,
        transactionData: transaction,
      },
      ...DEFAULT_MODAL_CONFIG,
    });
    const componentInstance = dialogRef.componentInstance;

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        mergeMap((data) =>
          this.transactionsService.editTransaction({
            ...data,
            id: transaction.id,
          }),
        ),
      )
      .subscribe(() => this.getTransactionsList(this.filterState));

    componentInstance.categoryTypeChanged.subscribe((type) => {
      this.currentCategories = this.sortCategories(type);
      componentInstance.categories = this.currentCategories;

      const settingCategoryName =
        transaction.category.type === type
          ? transaction.category.name
          : undefined;
      componentInstance.setCategory(settingCategoryName);
    });

    componentInstance.deleteBtnClicked
      .pipe(
        mergeMap((id) => {
          dialogRef.close();
          return this.transactionsService.deleteTransaction(id);
        }),
      )
      .subscribe(() => this.getTransactionsList(this.filterState));
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
