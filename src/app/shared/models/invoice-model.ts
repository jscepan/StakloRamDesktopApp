import { BaseModel } from './base-model';
import { BuyerModel } from './buyer-model';
import { InvoiceItemModel } from './invoice-item.model';

export class InvoiceModel extends BaseModel {
  createDate: Date;
  advancePayment: number = 0;
  buyer?: BuyerModel;
  invoiceItems: InvoiceItemModel[] = [];
}
