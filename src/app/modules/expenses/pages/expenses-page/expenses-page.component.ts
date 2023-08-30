import { Component } from '@angular/core';
import { IExpenses } from '../../models/expenses.interface';

const expenses: IExpenses[] = [
  {
    date: new Date(),
    amount: 100,
    description: 'initial expenses',
    categoryId: 1,
  },
];

@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.scss'],
})
export class ExpensesPageComponent {
  columns: string[] = ['date', 'amount', 'categoryId', 'description'];
  data: IExpenses[] = expenses;
}
