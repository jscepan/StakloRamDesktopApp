import { BaseModel } from './base-model';
import { InvoiceItemModel } from './invoice-item.model';

export class InvoiceModel extends BaseModel {
  createDate: Date = new Date();
  invoiceItems: InvoiceItemModel[] = [];
  amount: number = 0;
  advancePayment: number = 0;
  buyerName?: string;
}

export class AdditionalInformation {
  amount: number = 0;
  advancePayment: number = 0;
  buyerName?: string;
}
