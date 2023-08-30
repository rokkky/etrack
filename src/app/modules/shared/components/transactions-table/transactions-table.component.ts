import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent {
  @Input() displayedColumns!: string[];
  @Input() dataSource: any[] = [];
}
