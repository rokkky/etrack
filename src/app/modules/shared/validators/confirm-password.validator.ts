import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordConfirmValidator(
  passField: string = 'password',
  confirmPassField: string = 'confirmPassword',
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const passControl = group.get(passField);
    const confirmPassControl = group.get(confirmPassField);
    return passControl?.value === confirmPassControl?.value
      ? null
      : { passMismatch: true };
  };
}
