import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { InvoiceItemCalculatorService } from 'src/app/shared/services/invoice-item-amount-calculator.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

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
    let items: string[] = [];
    let num = 1;
    this.invoiceItemCalculatorService
      .getFramesLengthAmountForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        items.push(
          num +
            ') ' +
            item.length +
            ' ' +
            item.uom +
            ' X ' +
            item.frame.cashRegisterNumber +
            ' (' +
            item.frame.name +
            ')'
        );
        num++;
      });
    this.invoiceItemCalculatorService
      .getGlassLengthForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        items.push(
          num +
            ') ' +
            item.length +
            ' ' +
            item.uom +
            ' X ' +
            item.glass.cashRegisterNumber +
            ' (' +
            item.glass.name +
            ')'
        );
        num++;
      });
    return items;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
