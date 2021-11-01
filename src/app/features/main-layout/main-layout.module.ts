import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, MainLayoutRoutingModule],
})
export class MainLayoutModule {}
