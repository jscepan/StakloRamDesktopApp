import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSettingsComponent } from './product-settings.component';
import { ProductSettingsRoutingModule } from './product-settings-routing.module';
import { TableShowModule } from 'src/app/shared/components/table-show/table-show.module';
import { CreateEditComponentService } from '@features/create-edit-popup/create-edit-component.service';
import { CreateEditPopupModule } from '@features/create-edit-popup/create-edit-popup.module';

@NgModule({
  declarations: [ProductSettingsComponent],
  imports: [
    CommonModule,
    ProductSettingsRoutingModule,
    TableShowModule,
    CreateEditPopupModule,
  ],
  exports: [ProductSettingsComponent],
})
export class ProductSettingsModule {}
