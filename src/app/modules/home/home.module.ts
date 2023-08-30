import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { ExpensesModule } from '../expenses/expenses.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    HomeRoutingModule,
    ExpensesModule,
  ],
  exports: [HomePageComponent],
})
export class HomeModule {}
