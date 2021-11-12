import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import {
  AdditionalInformation,
  InvoiceModel,
} from 'src/app/shared/models/invoice-model';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/invoice-items-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { InvoiceWebService } from 'src/app/shared/services/invoice.web.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoicePrinted } from './invoice-printed/invoice-printed.interface';
import { PrintInvoicePopupService } from './print-invoice-popup/print-invoice-popup-component.service';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.component.html',
  styleUrls: ['./invoice-create-edit.component.scss'],
  providers: [InvoiceWebService, PrintInvoicePopupService],
})
export class InvoiceCreateEditComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  isEdit: boolean = true;
  invoice: InvoiceModel = new InvoiceModel();
  currency: string = 'din';

  invoiceForm: FormGroup;

  // For delete - just temporary
  tempShowForDelete: InvoicePrinted;

  constructor(
    private route: Router,
    private _activeRoute: ActivatedRoute,
    private draftInvoicesStoreService: DraftInvoicesService,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private printInvoicePopupComponentService: PrintInvoicePopupService,
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
  }

  initializeForm(): void {
    this.invoiceForm = new FormGroup({
      buyerName: new FormControl(
        this.invoice.additionalInformation.buyerName,
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
    this.subs.sink.printInvoice = this.printInvoicePopupComponentService
      .openDialog(this.invoice.additionalInformation)
      .subscribe((addInf: AdditionalInformation) => {
        if (addInf) {
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('invoiceCreated'),
            this.translateService.instant('invoiceSuccessfullyCreated')
          );
          this.invoice.additionalInformation.advancePayment =
            addInf.advancePayment;
          this.invoice.additionalInformation.buyerName = addInf.buyerName;

          // TODO
          // save to database
          let xxx: {
            title: string;
            description: string;
            amount: number;
          }[] = [];
          this.invoice.invoiceItems.forEach((item) => {
            xxx.push({
              title: 'Naslov',
              description: 'Opis stavke',
              amount: item.amount,
            });
          });
          this.tempShowForDelete = {
            invoiceNumber: 11,
            buyerName: this.invoice.additionalInformation.buyerName,
            date: this.invoice.createDate,
            invoiceItems: xxx,
            amount: this.invoice.additionalInformation.amount,
            advancePayment: this.invoice.additionalInformation.advancePayment,
          };
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
