import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InvoiceItemModel } from '../../models/invoice-item.model';

@Injectable()
export class InvoiceItemsStoreService {
  private $draftInvoiceItems: BehaviorSubject<InvoiceItemModel[]> =
    new BehaviorSubject<InvoiceItemModel[]>([]);
  public readonly draftInvoiceItems: Observable<InvoiceItemModel[]> =
    this.$draftInvoiceItems.asObservable();

  constructor() {}

  clearDraftInvoiceItems(): void {
    this.$draftInvoiceItems.next([]);
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
}
