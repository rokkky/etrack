import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from '../profile/pages/profile-page/profile-page.component';
import { ExpensesPageComponent } from '../transactions/pages/expenses-page/expenses-page.component';
import { IncomesPageComponent } from '../transactions/pages/incomes-page/incomes-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'expenses',
        component: ExpensesPageComponent,
      },
      {
        path: 'incomes',
        component: IncomesPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
