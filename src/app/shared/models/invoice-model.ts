import { BaseModel } from './base-model';
import { InvoiceItemModel } from './invoice-item.model';

export class InvoiceModel extends BaseModel {
  createDate: Date;
  advancePayment: number = 0;
  buyerName?: string;
  buyerPhone?: string;
  invoiceItems: InvoiceItemModel[] = [];
}
