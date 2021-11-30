import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceOrderPrintedComponent } from './invoice-order-printed.component';
import { TranslateModule } from '@ngx-translate/core';
import { FramingDescriptionModule } from 'src/app/shared/components/framing-description/framing-description.module';

@NgModule({
  declarations: [InvoiceOrderPrintedComponent],
  imports: [CommonModule, TranslateModule, FramingDescriptionModule],
  exports: [InvoiceOrderPrintedComponent],
})
export class InvoiceOrderPrintedModule {}
