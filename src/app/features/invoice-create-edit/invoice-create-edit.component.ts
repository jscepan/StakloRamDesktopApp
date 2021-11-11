import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/invoice-items-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { InvoiceWebService } from 'src/app/shared/services/invoice.web.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.component.html',
  styleUrls: ['./invoice-create-edit.component.scss'],
  providers: [InvoiceWebService],
})
export class InvoiceCreateEditComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

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
    // private printInvoicePopupComponentService: PrintInvoicePopupComponentService,
    private webService: InvoiceWebService
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
    // if (oid === 'temporary') {
    //   this.subs.sink = this.invoiceItemsStoreService.draftInvoice.subscribe(
    //     (invoice) => {
    //       this.invoice = invoice;
    //     }
    //   );
    //   this.initializeForm();
    //   this.invoiceItemsStoreService.draftInvoiceItems.subscribe((items) => {
    //     this.invoice.invoiceItems = items;
    //   });
    // } else {
    //   this.invoiceItemsStoreService.clearDraftInvoices();
    //   this.invoiceItemsStoreService.draftInvoiceItems.subscribe((items) => {
    //     this.invoice.invoiceItems = items;
    //     if (oid) {
    //       // TODO
    //       this.isEdit = true;
    //     } else {
    //       this.invoice.createDate = new Date();
    //       this.invoice.additionalInformation.buyerName = '';
    //       this.invoice.additionalInformation.buyerPhone = '';
    //       this.invoice.additionalInformation.advancePayment = 0;
    //     }
    //     this.initializeForm();
    //   });
    // }
  }

  initializeForm(): void {
    this.invoiceForm = new FormGroup({
      buyerName: new FormControl(
        this.invoice.additionalInformation.buyerName,
        []
      ),
      buyerPhone: new FormControl(
        this.invoice.additionalInformation.buyerPhone,
        []
      ),
      advancePayment: new FormControl(
        this.invoice.additionalInformation.advancePayment,
        []
      ),
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

  increasePaymentFor(value: number): void {
    const v = this.invoiceForm.get('advancePayment');
    v.value + value > this.invoice.additionalInformation.amount
      ? v.setValue(this.invoice.additionalInformation.amount)
      : v.setValue(v.value + value);
  }

  setInvoiceAmount(): void {
    let amount = 0;
    this.invoice.invoiceItems.forEach((item) => {
      amount += item.amount;
    });
    this.invoice.additionalInformation.amount = amount;
  }

  print(): void {
    // this.subs.sink.finishInvoice = this.printInvoicePopupComponentService
    //   .openDialog(this.invoice.additionalInformation, this.getInvoiceAmount())
    //   .subscribe((inf) => {
    //     this.invoice.additionalInformation = inf;
    //     //TODO save invoice to
    //   });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
