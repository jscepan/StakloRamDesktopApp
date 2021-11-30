import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import {
  AdditionalInformation,
  InvoiceModel,
} from 'src/app/shared/models/invoice-model';
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

  isEdit: boolean = true;
  invoice: InvoiceModel = new InvoiceModel();
  currency: string = 'din';

  invoiceForm: FormGroup;

  // TODO: this property has to be deleted - only for dev mode
  invoicePrinted: boolean = false;

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
    this.subs.sink = this.draftInvoicesStoreService.draftInvoices.subscribe(
      (invoices) => {
        const invoice = invoices.filter((i) => i.oid === oid)[0];
        if (invoice) {
          this.invoice = invoice;
          this.initializeForm();
          this.setInvoiceAmount();
        }
      }
    );
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
      .openDialog({
        amount: this.invoice.amount,
        advancePayment: this.invoice.advancePayment,
        buyerName: this.invoice.buyerName,
      })
      .subscribe((addInf: AdditionalInformation) => {
        if (addInf) {
          this.invoice.advancePayment = addInf.advancePayment;
          this.invoice.buyerName = addInf.buyerName;
          // TODO
          this.subs.sink = this.invoiceWebService
            .createEntity(this.invoice)
            .subscribe((invoice) => {
              if (invoice) {
                this.globalService.showBasicAlert(
                  MODE.success,
                  this.translateService.instant('invoiceCreated'),
                  this.translateService.instant('invoiceSuccessfullyCreated')
                );
              }
            });
          this.invoicePrinted = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
