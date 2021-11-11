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
    v.setValue(v.value + value);
  }

  print(): void {
    // this.subs.sink.finishInvoice = this.printInvoicePopupComponentService
    //   .openDialog(this.invoice.additionalInformation, this.getInvoiceAmount())
    //   .subscribe((inf) => {
    //     this.invoice.additionalInformation = inf;
    //     //TODO save invoice to
    //   });
  }

  getInvoiceAmount(): number {
    let amount = 0;
    this.invoice.invoiceItems.forEach((item) => {
      let itemAmount = 0;
      let glassPrice = 0;
      let passpartuPrice = 0;
      let mirrorPrice = 0;
      let framesPrice = 0;
      if (item.glass) {
        const surface =
          this.getConstructionMeasure(item.dimensions.height) *
          this.getConstructionMeasure(item.dimensions.width);
        glassPrice = this.getPricePerUom(
          { ppUom: item.glass.pricePerUom, uom: item.glass.uom },
          { count: surface, uom: UOM.CENTIMETER2 }
        );
      }
      if (item.passpartu) {
        const surface =
          this.getConstructionMeasure(item.dimensions.height) *
          this.getConstructionMeasure(item.dimensions.width);
        passpartuPrice = this.getPricePerUom(
          {
            ppUom: item.passpartu.value.passpartu.pricePerUom,
            uom: item.passpartu.value.passpartu.uom,
          },
          { count: surface, uom: UOM.CENTIMETER2 }
        );
      }
      if (item.mirror) {
        const surface =
          this.getConstructionMeasure(item.dimensions.height) *
          this.getConstructionMeasure(item.dimensions.width);
        mirrorPrice = this.getPricePerUom(
          { ppUom: item.mirror.pricePerUom, uom: item.mirror.uom },
          { count: surface, uom: UOM.CENTIMETER2 }
        );
      }
      if (item.selectedFrames.length > 0) {
        item.selectedFrames.forEach((frame) => {
          framesPrice += this.getFramePrice(
            item.dimensions.height,
            item.dimensions.width,
            item.dimensions.uom,
            frame.frameWidthMM,
            frame.pricePerUom,
            frame.uom
          );
        });
      }
      console.log('itemAmount');
      console.log(itemAmount);
      console.log('glassPrice');
      console.log(glassPrice);
      console.log('passpartuPrice');
      console.log(passpartuPrice);
      console.log('mirrorPrice');
      console.log(mirrorPrice);
      console.log('framesPrice');
      console.log(framesPrice);
      itemAmount = glassPrice + passpartuPrice + mirrorPrice + framesPrice;
      amount += itemAmount;
    });
    return amount;
  }

  getFramePrice(
    imageHeight: number,
    imageWidth: number,
    imageUom: UOM,
    frameWidthMM: number,
    ppUom: number,
    frameUom: UOM
  ): number {
    let amount = 0;
    let length = imageHeight * 2 + imageWidth * 2;
    if (imageUom === UOM.CENTIMETER) {
      if (frameUom === UOM.CENTIMETER) {
        length += (frameWidthMM * 8) / 10;
        amount = length * ppUom;
      } else if (frameUom === UOM.METER) {
        length += (frameWidthMM * 8) / 1000;
        amount = length * (ppUom / 100);
      }
    }
    return amount;
  }

  private getConstructionMeasure(num: number): number {
    num++;
    if (num % 3 === 0) {
      return num;
    } else if (num++) {
      return num;
    } else if (num++) {
      return num;
    }
  }

  private getPricePerUom(
    price: { ppUom: number; uom: UOM },
    unit: { count: number; uom: UOM }
  ): number {
    if (unit.uom === UOM.CENTIMETER2) {
      if (price.uom === UOM.CENTIMETER2) {
        return unit.count * price.ppUom;
      } else if (price.uom === UOM.METER2) {
        return (unit.count * price.ppUom) / 10000;
      }
    } else if (unit.uom === UOM.CENTIMETER) {
      if (price.uom === UOM.CENTIMETER) {
        return unit.count * price.ppUom;
      } else if (price.uom === UOM.METER) {
        return (unit.count * price.ppUom) / 100;
      }
    }
    return 0;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
