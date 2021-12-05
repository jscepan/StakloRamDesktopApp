import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
export class InvoicePrintedComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs = new SubscriptionManager();
  prefix: string = Constants.BARCODE_PREFIX;

  @Input() dataModel: InvoiceModel;
  header: string = '';
  footer: string = '';
  currencyDisplay: string = '';

  constructor(
    private settingsService: AppSettingsService,
    private cdRef: ChangeDetectorRef,
    private invoiceItemCalculatorService: InvoiceItemCalculatorService
  ) {}

  ngOnInit(): void {
    this.settingsService.settings.subscribe((settings) => {
      this.header = settings.header;
      this.footer = settings.footer;
      this.currencyDisplay = settings.currencyDisplayValue;
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  getItemsDescription(): string[] {
    let items: string[] = [];
    let num = 1;
    this.invoiceItemCalculatorService
      .getFramesLengthAmountForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        if (item.amount && item.amount > 0) {
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
              ', ' +
              item.frame.code.substring(0, 2) +
              ')'
          );
          num++;
        }
      });
    this.invoiceItemCalculatorService
      .getPasspartuLengthForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        if (item.amount && item.amount > 0) {
          items.push(
            num +
              ') ' +
              item.length +
              ' ' +
              item.uom +
              ' X ' +
              item.passpartuColor.passpartu.cashRegisterNumber +
              ' (' +
              item.passpartuColor.name +
              ')'
          );
          num++;
        }
      });
    this.invoiceItemCalculatorService
      .getGlassLengthForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        if (item.amount && item.amount > 0) {
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
        }
      });
    this.invoiceItemCalculatorService
      .getMirrorLengthForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        if (item.amount && item.amount > 0) {
          items.push(
            num +
              ') ' +
              item.length +
              ' ' +
              item.uom +
              ' X ' +
              item.mirror.cashRegisterNumber +
              ' (' +
              item.mirror.name +
              ')'
          );
          num++;
        }
      });
    this.invoiceItemCalculatorService
      .getSandingLengthForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        if (item.amount && item.amount > 0) {
          items.push(
            num +
              ') ' +
              item.length +
              ' ' +
              item.uom +
              ' X ' +
              item.sanding.cashRegisterNumber +
              ' (' +
              item.sanding.name +
              ')'
          );
          num++;
        }
      });
    this.invoiceItemCalculatorService
      .getFacetingLengthForInvoiceItems(this.dataModel.invoiceItems)
      .forEach((item) => {
        if (item.amount && item.amount > 0) {
          items.push(
            num +
              ') ' +
              item.length +
              ' ' +
              item.uom +
              ' X ' +
              item.faceting.cashRegisterNumber +
              ' (' +
              item.faceting.name +
              ')'
          );
          num++;
        }
      });
    return items;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
