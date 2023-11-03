import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { TransactionsModule } from '../transactions/transactions.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    TransactionsModule,
    HomeRoutingModule,
    ProfileModule,
  ],
  exports: [HomePageComponent],
})
export class HomeModule {}
