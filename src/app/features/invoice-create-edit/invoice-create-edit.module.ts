import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceCreateEditComponent } from './invoice-create-edit.component';
import { InvoiceCreateEditRoutingModule } from './invoice-create-edit-routing.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvoiceCreateEditComponent],
  imports: [
    CommonModule,
    InvoiceCreateEditRoutingModule,
    ButtonModule,
    TranslateModule,
    // FormsModule,
    ReactiveFormsModule,
    // MatFormField,
  ],
  exports: [InvoiceCreateEditComponent],
})
export class InvoiceCreateEditModule {}
