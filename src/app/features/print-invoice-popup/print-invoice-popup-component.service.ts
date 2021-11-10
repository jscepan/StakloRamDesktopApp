import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { AdditionalInformation } from 'src/app/shared/models/invoice-model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { PrintInvoicePopupComponent } from './print-invoice-popup.component';

@Injectable()
export class PrintInvoicePopupComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(
    additionalInformation: AdditionalInformation,
    invoiceAmount: number
  ): Observable<AdditionalInformation> {
    return new Observable((observer: Subscriber<AdditionalInformation>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      config.width = '80%';
      config.height = '80%';
      config.data = {
        additionalInformation: additionalInformation,
        invoiceAmount: invoiceAmount,
      };
      this.subs.sink.$openSelectPopup = this._matDialog
        .open(PrintInvoicePopupComponent, config)
        .afterClosed()
        .subscribe(
          (inf: AdditionalInformation) => {
            observer.next(inf);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}