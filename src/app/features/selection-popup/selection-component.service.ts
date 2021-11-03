import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { SubscriptionManager } from 'src/app/services/subscription.manager';
import { FieldModel } from 'src/app/shared/models/field-model';
import { SelectionPopupComponent } from './selection-popup.component';

@Injectable()
export class SelectionComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(items: FieldModel[]): Observable<string> {
    return new Observable((observer: Subscriber<string>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      // config.width = '80%';
      // config.height = '80%';

      const selectedOids: string[] = [];
      config.data = {
        selectedOids,
        items,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(SelectionPopupComponent, config)
        .afterClosed()
        .subscribe(
          (oids: string[]) => {
            observer.next(oids[0]);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
