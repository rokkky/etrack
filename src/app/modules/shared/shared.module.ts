import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FieldErrorComponent,
    TransactionsTableComponent,
    TableHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  exports: [
    FieldErrorComponent,
    TransactionsTableComponent,
    TableHeaderComponent,
  ],
})
export class SharedModule {}
