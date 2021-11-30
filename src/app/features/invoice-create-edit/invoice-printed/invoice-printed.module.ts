import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePrintedComponent } from './invoice-printed.component';
import { TranslateModule } from '@ngx-translate/core';
import { FramingDescriptionModule } from 'src/app/shared/components/framing-description/framing-description.module';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  declarations: [InvoicePrintedComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FramingDescriptionModule,
    NgxBarcodeModule,
  ],
  exports: [InvoicePrintedComponent],
})
export class InvoicePrintedModule {}
