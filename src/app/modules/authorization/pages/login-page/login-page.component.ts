import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  formError?: string;

  constructor(
    private router: Router,
    private authService: AuthorizationService,
  ) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.formError = undefined;
    });
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  navigateToRegisterPage(): void {
    this.router.navigate(['signup']);
  }

  navigateToResetPassPage(): void {
    //TODO: Implement router redirect to reset password page after implementation
  }

  loginUser(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res) this.router.navigate(['home']);
        },
        (err) => {
          this.formError = err.message;
        },
      );
    }
  }
}
