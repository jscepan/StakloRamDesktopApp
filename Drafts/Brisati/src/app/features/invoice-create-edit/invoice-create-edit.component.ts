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
import { InvoiceWebService } from 'src/app/shared/services/invoice.web.service';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/draft-invoice-items-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoicePrinted } from './invoice-printed/invoice-printed.interface';
import { PrintInvoicePopupService } from './print-invoice-popup/print-invoice-popup-component.service';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.component.html',
  styleUrls: ['./invoice-create-edit.component.scss'],
  providers: [PrintInvoicePopupService, InvoiceWebService],
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
    private printInvoicePopupComponentService: PrintInvoicePopupService
  ) {}

  ngOnInit(): void {
    // const electron = require('electron');
    // const { ipcRenderer } = electron;
    // ipcRenderer.send('xxxx', 'invoices');
    // const electron = require('electron');
    // const ipc = electron.ipcRenderer;
    // ipc.send('xxxx')
    // const mysql = require('mysql2');

    // var con = mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   password: 'user',
    // });

    // con.connect(function (err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Connected!');

    //     var sql =
    //       "INSERT INTO radnja.invoice (invoiceCreateDate, invoiceAmount, invoiceAdvancePayment, invoiceBuyerName) VALUES ('2021-11-21 00:00:00', 666, 555,'Company Inc')";
    //     con.query(sql, function (err, result) {
    //       if (err) throw err;
    //       console.log('1 record inserted');
    //     });

    //     con.query('SELECT * FROM radnja.invoice', function (err, result) {
    //       if (err) {
    //         throw err;
    //       }
    //       console.log('Result: ');
    //       console.log(result);
    //       console.log('kraj');
    //     });
    //   }
    //   con.end(() => console.log('connection closed'));
    // });

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
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('invoiceCreated'),
            this.translateService.instant('invoiceSuccessfullyCreated')
          );
          this.invoice.advancePayment = addInf.advancePayment;
          this.invoice.buyerName = addInf.buyerName;

          // TODO
          // save to database
          let ii: {
            title: string;
            description: string;
            amount: number;
          }[] = [];
          this.invoice.invoiceItems.forEach((item) => {
            ii.push({
              title: item.itemTitle,
              description:
                'Opis stavke asdkljfla skdfjlsdkjf sldkajf lksdj flsdkj afskdj fsdk fjkjlckv',
              amount: item.amount,
            });
          });
          this.tempShowForDelete = {
            invoiceNumber: this.invoice.oid,
            buyerName: this.invoice.buyerName,
            date: this.invoice.createDate,
            invoiceItems: ii,
            amount: this.invoice.amount,
            advancePayment: this.invoice.advancePayment,
          };
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
