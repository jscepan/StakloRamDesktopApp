import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePrintedComponent } from './invoice-printed.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InvoicePrintedComponent],
  imports: [CommonModule, TranslateModule],
  exports: [InvoicePrintedComponent],
})
export class InvoicePrintedModule {}
