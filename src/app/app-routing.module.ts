import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/authorization/pages/login-page/login-page.component';
import { SignupPageComponent } from './modules/authorization/pages/signup-page/signup-page.component';
import { canActivateAuthGuard } from './modules/core/guards/can-activate-auth.guard';
import { canActivateLoginGuard } from './modules/core/guards/can-activate-login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [canActivateLoginGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [canActivateLoginGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((module) => module.HomeModule),
    canActivate: [canActivateAuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
