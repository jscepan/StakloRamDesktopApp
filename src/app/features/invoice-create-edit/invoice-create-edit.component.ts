import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { InvoiceItemsStoreService } from 'src/app/shared/services/data-store-services/invoice-items-store.service';
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
  invoice: InvoiceModel;
  currency: string = 'din';

  invoiceForm: FormGroup;

  constructor(
    private route: Router,
    private _activeRoute: ActivatedRoute,
    private invoiceItemsStoreService: InvoiceItemsStoreService,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: InvoiceWebService
  ) {}

  ngOnInit(): void {
    // const oid = this._activeRoute.snapshot.paramMap.get('invoiceOid');
    // if (!!oid) {
    //   this.isEdit = true;
    //   this.webService.getEntityByOid(oid).subscribe((invoice) => {
    //     this.invoice = invoice;
    //   });
    // }
    const oid = this._activeRoute.snapshot.paramMap.get('invoiceOid');
    if (oid === 'temporary') {
      this.subs.sink = this.invoiceItemsStoreService.draftInvoice.subscribe(
        (invoice) => {
          this.invoice = invoice;
        }
      );
      this.initializeForm();
    } else {
      this.invoice = new InvoiceModel();
      this.invoice.createDate = new Date();
      this.invoice.buyerName = '';
      this.invoice.buyerPhone = '';
      this.invoice.advancePayment = 0;
      this.initializeForm();
    }

    this.invoiceItemsStoreService.draftInvoiceItems.subscribe((items) => {
      this.invoice.invoiceItems = items;
    });
  }

  initializeForm(): void {
    this.invoiceForm = new FormGroup({
      buyerName: new FormControl(this.invoice.buyerName, []),
      buyerPhone: new FormControl(this.invoice.buyerPhone, []),
      advancePayment: new FormControl(this.invoice.advancePayment, []),
    });
  }

  create(action: 'framingg' | 'glassing'): void {
    this.route.navigate([action]);
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

  editInvoiceItem(invoiceItem): void {
    this.invoiceItemsStoreService.saveDraftInvoice(this.invoice);
    this.route.navigate(['framingg', 'edit', invoiceItem.oid]);
  }

  deleteInvoiceItem(invoiceItem): void {
    // TODO
  }

  increasePaymentFor(value: number): void {
    const v = this.invoiceForm.get('advancePayment');
    v.setValue(v.value + value);
  }

  print(): void {
    // TODO
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
