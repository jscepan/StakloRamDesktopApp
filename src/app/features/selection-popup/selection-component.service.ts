import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { SelectionItem } from './selection-item/selection-item.interface';
import { SelectionPopupComponent } from './selection-popup.component';

@Injectable()
export class SelectionComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(items: SelectionItem[]): Observable<string> {
    return new Observable((observer: Subscriber<string>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      // const selectedOid: string='';
      config.data = {
        // selectedOid,
        items,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(SelectionPopupComponent, config)
        .afterClosed()
        .subscribe(
          (oid: string) => {
            observer.next(oid);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
