import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesPageComponent } from './pages/expenses-page/expenses-page.component';
import { IncomesPageComponent } from './pages/incomes-page/incomes-page.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionFormModalComponent } from './components/transaction-form-modal/transaction-form-modal.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { CategoryFormModalComponent } from './components/category-form-modal/category-form-modal.component';

@NgModule({
  declarations: [
    ExpensesPageComponent,
    IncomesPageComponent,
    TransactionFormModalComponent,
    TransactionsTableComponent,
    CategoryFormModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
})
export class TransactionsModule {}
