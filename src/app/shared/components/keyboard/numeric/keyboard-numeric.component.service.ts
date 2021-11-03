import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { SubscriptionManager } from 'src/app/services/subscription.manager';
import { KeyboardNumericComponent } from './keyboard-numeric.component';

@Injectable()
export class KeyboardNumericComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(
    title: string,
    uom: string,
    showNextOperationButton: boolean,
    inputFieldTitle: string,
    value: string = ''
  ): Observable<string> {
    return new Observable((observer: Subscriber<string>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        title,
        uom,
        value,
        showNextOperationButton,
        inputFieldTitle,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(KeyboardNumericComponent, config)
        .afterClosed()
        .subscribe(
          (text: string) => {
            observer.next(text);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}