import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface RangeSelect {
  value: string;
  label: string;
}

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent {
  @Input() title: string = 'Expenses history';

  ranges: RangeSelect[] = [
    {
      value: 'month',
      label: 'Last month',
    },
    {
      value: '3month',
      label: 'Last 3 month',
    },
    {
      value: 'year',
      label: 'Last year',
    },
  ];

  searchForm: FormGroup = new FormGroup({
    searchField: new FormControl(''),
    rangeSelector: new FormControl(this.ranges[0].value),
  });
}
