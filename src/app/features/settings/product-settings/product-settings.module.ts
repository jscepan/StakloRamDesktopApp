import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSettingsComponent } from './product-settings.component';
import { ProductSettingsRoutingModule } from './product-settings-routing.module';
import { TableShowModule } from 'src/app/shared/components/table-show/table-show.module';

@NgModule({
  declarations: [ProductSettingsComponent],
  imports: [CommonModule, ProductSettingsRoutingModule, TableShowModule],
  exports: [ProductSettingsComponent],
})
export class ProductSettingsModule {}
