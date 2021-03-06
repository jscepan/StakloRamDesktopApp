import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { KeyboardNumericComponent } from './keyboard-numeric.component';

@Injectable()
export class KeyboardNumericComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(
    title: string,
    uom: UOM,
    showNextOperationButton: boolean,
    inputFieldTitle: string,
    value: number = 0,
    codeInput: boolean = false
  ): Observable<{ value: string; nextOperation: boolean }> {
    return new Observable(
      (observer: Subscriber<{ value: string; nextOperation: boolean }>) => {
        const config: MatDialogConfig = new MatDialogConfig();

        config.data = {
          title,
          uom,
          value,
          showNextOperationButton,
          inputFieldTitle,
          codeInput,
        };

        this.subs.sink.$openSelectPopup = this._matDialog
          .open(KeyboardNumericComponent, config)
          .afterClosed()
          .subscribe(
            (data: { value: string; nextOperation: boolean }) => {
              observer.next(data);
              observer.complete();
            },
            () => observer.error()
          );
      }
    );
  }
}
