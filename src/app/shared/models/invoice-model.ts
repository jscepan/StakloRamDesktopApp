import { BaseModel } from './base-model';
import { InvoiceItem } from './invoice-item.model';

export class Invoice extends BaseModel {
  createDate: Date;
  invoiceItems: InvoiceItem[] = [];
}
