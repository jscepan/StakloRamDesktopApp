import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePrintedComponent } from './invoice-printed.component';
import { TranslateModule } from '@ngx-translate/core';
import { FramingDescriptionModule } from 'src/app/shared/components/framing-description/framing-description.module';

@NgModule({
  declarations: [InvoicePrintedComponent],
  imports: [CommonModule, TranslateModule, FramingDescriptionModule],
  exports: [InvoicePrintedComponent],
})
export class InvoicePrintedModule {}
