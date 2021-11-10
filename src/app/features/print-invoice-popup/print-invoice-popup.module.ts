import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintInvoicePopupComponent } from './print-invoice-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PrintInvoicePopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
  ],
  exports: [PrintInvoicePopupComponent],
  entryComponents: [PrintInvoicePopupComponent],
})
export class PrintInvoicePopupModule {}
