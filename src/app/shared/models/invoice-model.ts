import { BaseModel } from './base-model';
import { InvoiceItemModel } from './invoice-item.model';

export class InvoiceModel extends BaseModel {
  createDate: Date;
  invoiceItems: InvoiceItemModel[] = [];
  additionalInformation?: AdditionalInformation = new AdditionalInformation();
}

export class AdditionalInformation {
  amount: number = 0;
  advancePayment: number = 0;
  buyerName?: string;
}
