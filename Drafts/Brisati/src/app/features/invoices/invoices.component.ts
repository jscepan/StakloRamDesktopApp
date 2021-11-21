import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/draft-invoice-items-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  providers: [],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  invoices: TableShow;

  constructor(
    private route: Router,
    private draftInvoicesStoreService: DraftInvoicesService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.draftInvoicesStoreService.draftInvoices.subscribe(
      (invoices) => {
        if (invoices) {
          this.invoices = this.mapDataToTableShow(invoices);
        }
      }
    );
  }

  mapDataToTableShow(invoices: InvoiceModel[]): TableShow {
    let table = {
      header: [
        this.translateService.instant('code'),
        this.translateService.instant('date'),
        this.translateService.instant('advancePayment'),
        this.translateService.instant('buyerName'),
      ],
      data: [],
    };
    invoices.forEach((entity) => {
      table.data.push(entity.oid);
      table.data.push(entity.createDate);
      table.data.push(entity.advancePayment);
      table.data.push(entity.buyerName);
    });
    return table;
  }

  editInvoice(oid: string): void {
    this.route.navigate(['invoice-create-edit', 'edit', oid]);
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

  clear(): void {
    this.draftInvoicesStoreService.clearDraftInvoices();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
