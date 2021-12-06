import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TableShowComponent } from './table-show.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MeSweetAlertModule } from '../me-sweet-alert/me-sweet-alert.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MeSweetAlertModule,
  ],
  exports: [TableShowComponent],
  declarations: [TableShowComponent],
})
export class TableShowModule {}
