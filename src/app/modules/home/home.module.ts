import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, RouterModule, CoreModule],
  exports: [HomePageComponent],
})
export class HomeModule {}
