import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/draft-invoice-items-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoiceWebService } from 'src/app/shared/services/web-services/invoice.web.service';
import { PrintInvoicePopupService } from './print-invoice-popup/print-invoice-popup-component.service';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.component.html',
  styleUrls: ['./invoice-create-edit.component.scss'],
  providers: [PrintInvoicePopupService],
})
export class InvoiceCreateEditComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  isDraft: boolean = true;
  isEdit: boolean = true;
  invoice: InvoiceModel = new InvoiceModel();
  currency: string = 'din';

  invoiceForm: FormGroup;

  constructor(
    private route: Router,
    private _activeRoute: ActivatedRoute,
    private draftInvoicesStoreService: DraftInvoicesService,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private printInvoicePopupComponentService: PrintInvoicePopupService,
    private invoiceWebService: InvoiceWebService
  ) {}

  ngOnInit(): void {
    const oid = this._activeRoute.snapshot.paramMap.get('invoiceOid');
    this.isDraft = oid.startsWith('draft');
    this.isDraft
      ? (this.subs.sink =
          this.draftInvoicesStoreService.draftInvoices.subscribe((invoices) => {
            const invoice = invoices.filter((i) => i.oid === oid)[0];
            if (invoice) {
              this.invoice = invoice;
              this.initializeForm();
              this.setInvoiceAmount();
            }
          }))
      : (this.subs.sink = this.invoiceWebService
          .getEntityByOid(oid)
          .subscribe((invoice) => {
            if (invoice && invoice.oid) {
              this.invoice = invoice;
              this.initializeForm();
            }
          }));
  }

  initializeForm(): void {
    this.invoiceForm = new FormGroup({
      buyerName: new FormControl(this.invoice.buyerName, []),
      advancePayment: new FormControl(this.invoice.advancePayment, []),
    });
  }

  create(action: 'framing' | 'glassing'): void {
    this.route.navigate([
      'invoice-create-edit',
      'edit',
      this.invoice.oid,
      action,
    ]);
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

  editInvoiceItem(invoiceItem: InvoiceItemModel): void {
    this.route.navigate([
      'invoice-create-edit',
      'edit',
      this.invoice.oid,
      'framing',
      'edit',
      invoiceItem.oid,
    ]);
  }

  deleteInvoiceItem(invoiceItem: InvoiceItemModel): void {
    this.draftInvoicesStoreService.removeDraftInvoiceItem(
      this.invoice.oid,
      invoiceItem.oid
    );
  }

  setInvoiceAmount(): void {
    let amount = 0;
    this.invoice.invoiceItems.forEach((item) => {
      amount += item.amount;
    });
    this.invoice.amount = amount;
  }

  print(): void {
    this.subs.sink.printInvoice = this.printInvoicePopupComponentService
      .openDialog(this.invoice)
      .subscribe((invoice: InvoiceModel) => {
        if (invoice) {
          this.invoice.advancePayment = invoice.advancePayment;
          this.invoice.buyerName = invoice.buyerName;
          this.invoice.user = invoice.user;
          // TODO
          if (this.isDraft) {
            this.subs.sink = this.invoiceWebService
              .createEntity(this.invoice)
              .subscribe((invoice) => {
                if (invoice && invoice.oid && +invoice.oid > 999999) {
                  this.invoice.oid = invoice.oid;
                  this.globalService.showBasicAlert(
                    MODE.success,
                    this.translateService.instant('invoiceCreated'),
                    this.translateService.instant('invoiceSuccessfullyCreated')
                  );
                  this.route.navigate(['/']);
                }
              });
          } else {
            this.subs.sink = this.invoiceWebService
              .updateEntity(this.invoice)
              .subscribe((invoice) => {
                if (invoice) {
                  this.invoice.oid = invoice.oid;
                  this.globalService.showBasicAlert(
                    MODE.success,
                    this.translateService.instant('invoiceUpdated'),
                    this.translateService.instant('invoiceSuccessfullyUpdated')
                  );
                }
              });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
