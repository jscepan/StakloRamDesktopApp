import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InvoiceItemModel } from '../../models/invoice-item.model';
import { InvoiceModel } from '../../models/invoice-model';

@Injectable()
export class InvoiceItemsStoreService {
  private $draftInvoiceItems: BehaviorSubject<InvoiceItemModel[]> =
    new BehaviorSubject<InvoiceItemModel[]>([]);
  public readonly draftInvoiceItems: Observable<InvoiceItemModel[]> =
    this.$draftInvoiceItems.asObservable();

  private $draftInvoice: BehaviorSubject<InvoiceModel | undefined> =
    new BehaviorSubject<InvoiceModel | undefined>(undefined);
  public readonly draftInvoice: Observable<InvoiceModel | undefined> =
    this.$draftInvoice.asObservable();

  constructor() {}

  clearDraftInvoiceItems(): void {
    this.$draftInvoiceItems.next([]);
  }

  clearDraftInvoice(): void {
    this.$draftInvoice.next(undefined);
  }

  saveDraftInvoice(invoice: InvoiceModel): void {
    invoice.oid = 'temporary';
    this.$draftInvoice.next(invoice);
  }

  addNewInvoiceItem(invoiceItem: InvoiceItemModel): void {
    // Add temporary oid
    invoiceItem.oid = 'temporary' + this.$draftInvoiceItems.getValue().length;
    const items = this.$draftInvoiceItems.getValue();
    items.push(invoiceItem);
    this.$draftInvoiceItems.next(items);
  }

  editInvoiceItem(invoiceItem: InvoiceItemModel): void {
    const items = this.$draftInvoiceItems.getValue();
    items.filter((i) => i.oid === invoiceItem.oid)[0] = invoiceItem;
    this.$draftInvoiceItems.next(items);
  }

  removeInvoiceItem(oid: string): void {
    const items = this.$draftInvoiceItems.getValue();
    this.$draftInvoiceItems.next(items.filter((i) => i.oid !== oid));
  }
}
