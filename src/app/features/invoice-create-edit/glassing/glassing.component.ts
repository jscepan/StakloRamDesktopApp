import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/draft-invoice-items-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-glassing',
  templateUrl: './glassing.component.html',
  styleUrls: ['./glassing.component.scss'],
  providers: [],
})
export class GlassingComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  invoiceOid: string | undefined;
  isEdit: boolean = false;

  constructor(
    private route: Router,
    private _activeRoute: ActivatedRoute,
    private draftInvoicesStoreService: DraftInvoicesService
  ) {}

  ngOnInit(): void {
    this.invoiceOid = this._activeRoute.snapshot.paramMap.get('invoiceOid');
    const oid = this._activeRoute.snapshot.paramMap.get('invoiceItemOid');
    if (this.invoiceOid) {
      this.draftInvoicesStoreService.draftInvoices.subscribe((invoices) => {
        let inv = invoices.filter((i) => i.oid === this.invoiceOid)[0];
        this.invoiceOid = inv.oid;
        if (oid) {
          this.isEdit = true;
          // TODO get invoice item
          // this.invoiceItem = inv.invoiceItems.filter((ii) => ii.oid === oid)[0];
          // this.initializeForm();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
