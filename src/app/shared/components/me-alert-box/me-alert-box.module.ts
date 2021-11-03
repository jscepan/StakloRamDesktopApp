import { NgModule } from '@angular/core';
import { MeAlertBoxComponent } from './me-alert-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MeBasicAlertModule } from '../me-basic-alert/me-basic-alert.module';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@NgModule({
  declarations: [MeAlertBoxComponent],
  imports: [CommonModule, TranslateModule, MeBasicAlertModule],
  exports: [MeAlertBoxComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {}
    }
  ]
})
export class MeAlertBoxModule {}
