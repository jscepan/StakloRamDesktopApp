import { BaseModel } from './base-model';
import { InvoiceItemModel } from './invoice-item.model';

export class InvoiceModel extends BaseModel {
  createDate: Date;
  invoiceItems: InvoiceItemModel[] = [];
  additionalInformation?: AdditionalInformation = new AdditionalInformation();
}

export class AdditionalInformation {
  advancePayment: number = 0;
  buyerName?: string;
  buyerPhone?: string;
}
