import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';

export interface InvoicePrinted {
  invoiceNumber: string;
  buyerName?: string;
  date: Date;
  invoiceItems: InvoiceItemModel[];
  amount: number;
  advancePayment: number;
}
