import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoiceItemCalculatorService } from '../framing/invoice-item-amount-calculator.service';

@Component({
  selector: 'app-invoice-printed',
  templateUrl: './invoice-printed.component.html',
  styleUrls: ['./invoice-printed.component.scss'],
  providers: [InvoiceItemCalculatorService],
})
export class InvoicePrintedComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();
  prefix: string = Constants.BARCODE_PREFIX;

  @Input() dataModel: InvoiceModel;
  header: string = '';
  footer: string = '';
  currencyDisplay: string = '';

  constructor(
    private settingsService: AppSettingsService,
    private invoiceItemCalculatorService: InvoiceItemCalculatorService
  ) {}

  ngOnInit(): void {
    this.settingsService.settings.subscribe((settings) => {
      this.header = settings.printSettings.header;
      this.footer = settings.printSettings.footer;
      this.currencyDisplay = settings.formatSettings.currencyDisplayValue;
    });
  }

  getItemsDescription(): string[] {
    let items = [];
    // this.dataModel.invoiceItems.forEach((item) => {
    //   item.
    // });
    let frames: { frame: FrameModel; length: number; amount: number }[] =
      this.invoiceItemCalculatorService.getFramesLengthAmountForInvoiceItems(
        this.dataModel.invoiceItems
      );
    frames.forEach((item) => {
      items.push('1) ' + item.length);
    });
    return ['skdlfjslkfdj', 'skdfjsldfkj'];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
