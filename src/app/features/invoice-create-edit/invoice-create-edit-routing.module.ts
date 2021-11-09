import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceCreateEditComponent } from './invoice-create-edit.component';

const routes: Routes = [
  { path: '', component: InvoiceCreateEditComponent },
  { path: 'edit/:invoiceOid', component: InvoiceCreateEditComponent },
  { path: 'view/:invoiceOid', component: InvoiceCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceCreateEditRoutingModule {}
