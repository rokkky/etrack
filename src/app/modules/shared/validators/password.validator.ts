import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passValid =
      control.value &&
      control.value.match('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*');

    if (passValid) {
      return null;
    }
    return { password: true };
  };
}
