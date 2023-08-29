import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  navigateToRegisterPage(): void {
    this.router.navigate(['signup']);
  }

  navigateToResetPassPage(): void {
    console.log('Here should be redirect to resset pass page');
  }

  loginUser(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      // Here should be call of api service
    }
  }
}
