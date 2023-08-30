import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesPageComponent } from './pages/expenses-page/expenses-page.component';

import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ExpensesPageComponent],
  imports: [CommonModule, MatTableModule, SharedModule],
})
export class ExpensesModule {}
