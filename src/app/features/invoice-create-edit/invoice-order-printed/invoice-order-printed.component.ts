import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-invoice-order-printed',
  templateUrl: './invoice-order-printed.component.html',
  styleUrls: ['./invoice-order-printed.component.scss'],
  providers: [],
})
export class InvoiceOrderPrintedComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  @Input() dataModel: InvoiceModel;
  header: string = '';
  footer: string = '';
  currencyDisplay: string = '';

  constructor(private settingsService: AppSettingsService) {}

  ngOnInit(): void {
    this.settingsService.settings.subscribe((settings) => {
      this.header = settings.printSettings.header;
      this.footer = settings.printSettings.footer;
      this.currencyDisplay = settings.formatSettings.currencyDisplayValue;
    });
    this.generateQRCode();
  }

  generateQRCode(): void {
    // TODO
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
