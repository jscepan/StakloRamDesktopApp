import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSettingsComponent } from './product-settings.component';
import { ProductSettingsRoutingModule } from './product-settings-routing.module';

@NgModule({
  declarations: [ProductSettingsComponent],
  imports: [CommonModule, ProductSettingsRoutingModule],
  exports: [ProductSettingsComponent],
})
export class ProductSettingsModule {}
