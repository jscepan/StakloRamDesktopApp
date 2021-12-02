import { BaseModel } from './base-model';
import { InvoiceItemModel } from './invoice-item.model';
import { UserModel } from './user-model';

export class InvoiceModel extends BaseModel {
  createDate: Date = new Date();
  invoiceItems: InvoiceItemModel[] = [];
  amount: number = 0;
  advancePayment: number = 0;
  buyerName?: string;
  user: UserModel;
}

export class AdditionalInformation {
  maxAmount: number = 0;
  amount: number = 0;
  advancePayment: number = 0;
  buyerName?: string;
  user: UserModel;
}
