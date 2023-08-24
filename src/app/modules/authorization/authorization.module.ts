import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent, SignupPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [LoginPageComponent],
})
export class AuthorizationModule {}
