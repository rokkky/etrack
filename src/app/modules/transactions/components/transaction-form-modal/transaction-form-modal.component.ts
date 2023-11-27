import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  ITransactionCategory,
  ITransactionCategoryCreation,
} from '../../types/transaction-category.interface';
import { CategoryFormModalComponent } from '../category-form-modal/category-form-modal.component';
import { TransactionTypes } from '../../types/transaction-types.enum';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { ITransaction } from '../../types/transaction.interface';
import {
  CUSTOM_DATEPICKER_FORMATS,
  MIN_DATEPICKER_DATE,
} from 'src/app/configs/datepicker.config';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-transaction-form-modal',
  templateUrl: './transaction-form-modal.component.html',
  styleUrls: ['./transaction-form-modal.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATEPICKER_FORMATS },
  ],
})
export class TransactionFormModalComponent implements OnInit {
  @Output() categoryTypeChanged: EventEmitter<TransactionTypes> =
    new EventEmitter();
  @Output() categoryAdded: EventEmitter<ITransactionCategoryCreation> =
    new EventEmitter();

  togglerTypes = TransactionTypes;

  currentDate = moment();
  minDate = MIN_DATEPICKER_DATE;

  categories: ITransactionCategory[] = [];
  defautCategory = 'Other';

  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionFormModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      categories: ITransactionCategory[];
      transactionType: TransactionTypes;
      data?: ITransaction;
    },
  ) {}
  ngOnInit(): void {
    this.categories = this.data.categories;
    this.transactionForm = this.fb.group({
      type: [this.data.transactionType],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      category: [null, [Validators.required]],
      amount: [
        null,
        [Validators.required, Validators.min(1), Validators.max(999999)],
      ],
      date: [this.currentDate, [Validators.required]],
    });
    this.setCategory();
  }

  onCategoryChange(category: TransactionTypes): void {
    this.categoryTypeChanged.emit(category);
  }

  saveTransaction(): void {
    this.transactionForm.markAllAsTouched();
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value);
    }
  }

  setCategory(categoryName: string = this.defautCategory): void {
    const selectedCategory =
      this.categories.find((category) => {
        return category.name === categoryName;
      })?.id || this.categories[0].id;
    this.transactionForm.get('category')?.setValue(selectedCategory);
  }

  openCategoryModal() {
    const dialogRef = this.dialog.open(CategoryFormModalComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.categoryAdded.subscribe((name) => {
      const isCategoryExist = this.categories.find(
        (category) => category.name === name,
      );
      if (isCategoryExist) {
        dialogRef.componentInstance.categoryName.setErrors({
          sameCategoryName: true,
        });
      } else {
        this.categoryAdded.emit({
          name,
          type: this.transactionForm.get('type')!.value,
        });
        dialogRef.close();
      }
    });
  }
}
