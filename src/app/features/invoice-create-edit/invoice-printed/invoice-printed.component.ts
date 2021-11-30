import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-invoice-printed',
  templateUrl: './invoice-printed.component.html',
  styleUrls: ['./invoice-printed.component.scss'],
  providers: [],
})
export class InvoicePrintedComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();
  prefix: string = Constants.BARCODE_PREFIX;

  @Input() dataModel: InvoiceModel;
  header: string = '';
  currencyDisplay: string = '';

  constructor(private settingsService: AppSettingsService) {}

  ngOnInit(): void {
    this.settingsService.settings.subscribe((settings) => {
      this.header = settings.printSettings.header;
      this.currencyDisplay = settings.formatSettings.currencyDisplayValue;
    });
    this.generateQRCode();
  }

  generateQRCode(): void {
    // TODO
  }

  getItemsDescription(): string[] {
    let items = [];
    // this.dataModel.invoiceItems.forEach((item) => {
    //   item.
    // });
    items.forEach((item) => {
      item = '1) ' + item;
    });
    return ['skdlfjslkfdj', 'skdfjsldfkj'];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
