import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from './components/field-error/field-error.component';

import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [FieldErrorComponent],
  imports: [CommonModule, MatFormFieldModule],
  exports: [FieldErrorComponent],
})
export class SharedModule {}
