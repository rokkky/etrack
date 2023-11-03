import {
  AfterViewInit,
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { ITransaction } from '../../types/transaction.interface';
import {
  PAGINATOR_MIN_SIZE,
  PAGINATOR_OPTIONS,
} from 'src/app/configs/paginator.config';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, merge } from 'rxjs';
import { IFilterState, ISortOptions } from '../../types/filter-state.interface';
import { FormGroup, FormControl } from '@angular/forms';

type PeriodSelect = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent implements AfterViewInit {
  @Input() paginatorLength!: number;
  @Input() displayedColumns!: string[];
  @Input() isLoading!: boolean;
  @Input() dataSource: ITransaction[] = [];

  @Output() tableReady: EventEmitter<IFilterState> = new EventEmitter();
  @Output() filterStateChanged: EventEmitter<IFilterState> = new EventEmitter();
  @Output() addTransactionClicked: EventEmitter<void> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns = ['date', 'amount', 'category', 'description'];
  periods: PeriodSelect[] = [
    {
      value: 'month',
      label: 'Last month',
    },
    {
      value: '3month',
      label: 'Last 3 month',
    },
    {
      value: '6month',
      label: 'Last 6 month',
    },
    {
      value: 'year',
      label: 'Last year',
    },
  ];
  searchForm: FormGroup = new FormGroup({
    searchField: new FormControl(''),
    periodSelector: new FormControl(this.periods[0].value),
  });
  sortOptions: ISortOptions = {};
  paginatorMinSize = PAGINATOR_MIN_SIZE;
  pageSize = PAGINATOR_MIN_SIZE;
  paginatorOptions: number[] = PAGINATOR_OPTIONS;

  ngAfterViewInit(): void {
    this.emitFilterStateChange();

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      const { active, direction } = this.sort;
      this.sortOptions = { active, direction };
      this.emitFilterStateChange();
    });

    merge(
      this.searchForm.get('periodSelector')!.valueChanges,
      this.searchForm.get('searchField')!.valueChanges,
    )
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.emitFilterStateChange();
      });
  }

  onAddTransactionClick(): void {
    this.addTransactionClicked.emit();
  }

  private emitFilterStateChange(): void {
    this.filterStateChanged.emit({
      sortOptions: this.sortOptions,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      period: this.searchForm.get('periodSelector')!.value,
      searchReq: this.searchForm.get('searchField')!.value,
    });
  }
}
