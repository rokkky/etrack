import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/modules/shared/validators/password.validator';
import { AuthorizationService } from '../../services/authorization.service';
import { passwordConfirmValidator } from 'src/app/modules/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  formError?: string;

  constructor(
    private router: Router,
    private authService: AuthorizationService,
  ) {}

  ngOnInit(): void {
    this.signupForm.valueChanges.subscribe(() => {
      this.formError = undefined;
    });
  }

  signupForm: FormGroup = new FormGroup(
    {
      username: new FormControl<string>('', [
        Validators.minLength(2),
        Validators.maxLength(32),
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        passwordValidator(),
      ]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
    },
    [passwordConfirmValidator('password', 'confirmPassword')],
  );

  navigateToLoginPage(): void {
    this.router.navigate(['login']);
  }

  signup(): void {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      this.authService.signup({ username, email, password }).subscribe(
        (res) => {
          //Timer + Notification about succesfull signup
          if (res.data?.signUp) {
            this.navigateToLoginPage();
          }
        },
        (err) => {
          this.formError = err.message;
        },
      );
    }
  }
}
