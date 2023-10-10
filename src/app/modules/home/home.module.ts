import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { ExpensesModule } from '../expenses/expenses.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    HomeRoutingModule,
    ExpensesModule,
    ProfileModule,
  ],
  exports: [HomePageComponent],
})
export class HomeModule {}
