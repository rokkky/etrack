import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
})
export class CategoryFormModalComponent {
  @Output() categoryAdded: EventEmitter<string> = new EventEmitter();

  categoryName = new FormControl('', [
    Validators.required,
    Validators.maxLength(40),
  ]);

  saveCategory(): void {
    this.categoryName.markAllAsTouched();
    if (this.categoryName.valid) {
      this.categoryAdded.emit(this.categoryName.value!);
    }
  }
}
