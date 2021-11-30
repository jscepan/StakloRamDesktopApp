import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceOrderPrintedComponent } from './invoice-order-printed.component';
import { TranslateModule } from '@ngx-translate/core';
import { FramingDescriptionModule } from 'src/app/shared/components/framing-description/framing-description.module';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  declarations: [InvoiceOrderPrintedComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FramingDescriptionModule,
    NgxBarcodeModule,
  ],
  exports: [InvoiceOrderPrintedComponent],
})
export class InvoiceOrderPrintedModule {}
