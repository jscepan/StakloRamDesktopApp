import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceCreateEditComponent } from './invoice-create-edit.component';
import { InvoiceCreateEditRoutingModule } from './invoice-create-edit-routing.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PrintInvoicePopupModule } from './print-invoice-popup/print-invoice-popup.module';
import { InvoicePrintedModule } from './invoice-printed/invoice-printed.module';

@NgModule({
  declarations: [InvoiceCreateEditComponent],
  imports: [
    CommonModule,
    InvoiceCreateEditRoutingModule,
    ButtonModule,
    MatInputModule,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PrintInvoicePopupModule,
    InvoicePrintedModule,
  ],
  exports: [InvoiceCreateEditComponent],
  providers: [],
})
export class InvoiceCreateEditModule {}