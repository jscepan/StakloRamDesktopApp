import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoicePrinted } from './invoice-printed.interface';

@Component({
  selector: 'app-invoice-printed',
  templateUrl: './invoice-printed.component.html',
  styleUrls: ['./invoice-printed.component.scss'],
  providers: [],
})
export class InvoicePrintedComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  @Input() dataModel: InvoicePrinted;
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
