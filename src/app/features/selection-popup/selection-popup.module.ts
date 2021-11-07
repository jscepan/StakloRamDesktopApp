import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectionPopupComponent } from '@features/selection-popup/selection-popup.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SelectionItemModule } from './selection-item/selection-item.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SelectionPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    SelectionItemModule,
    TranslateModule,
  ],
  exports: [SelectionPopupComponent],
  entryComponents: [SelectionPopupComponent],
})
export class SelectionPopupModule {}
