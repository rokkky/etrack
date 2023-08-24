import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/modules/shared/validators/password.validator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  constructor(private router: Router) {}

  signupForm: FormGroup = new FormGroup({
    userName: new FormControl<string>('', [
      Validators.minLength(2),
      Validators.maxLength(32),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      passwordValidator(),
    ]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  });

  navigateToLoginPage(): void {
    this.router.navigate(['login']);
  }

  signup(): void {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
}
