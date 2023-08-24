import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ERROR_MESSAGES } from 'src/app/constants/error-messages';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent {
  @Input() control!: AbstractControl;
  @Input() fieldName!: string;

  showValidationMessage(): string {
    const errors: ValidationErrors =
      <ValidationErrors>this.control?.errors || {};

    return Object.entries(errors).map(([err]) => {
      const message = ERROR_MESSAGES[err]
        .replace(':field:', this.fieldName)
        .replace(':n:', this.control.getError(err)['requiredLength']);
      return message;
    })[0];
  }
}
