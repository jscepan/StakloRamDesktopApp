import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';

export interface InvoiceOrderPrinted {
  invoiceNumber: string;
  buyerName?: string;
  date: Date;
  invoiceItems: InvoiceItemModel[];
  amount: number;
  advancePayment: number;
}
