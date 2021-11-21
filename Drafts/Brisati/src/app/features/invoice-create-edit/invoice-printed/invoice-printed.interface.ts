export interface InvoicePrinted {
  invoiceNumber: string;
  buyerName?: string;
  date: Date;
  invoiceItems: {
    title: string;
    description: string;
    amount: number;
  }[];
  amount: number;
  advancePayment: number;
}
