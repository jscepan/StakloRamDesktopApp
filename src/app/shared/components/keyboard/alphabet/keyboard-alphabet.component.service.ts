import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { SubscriptionManager } from 'src/app/services/subscription.manager';
import { KeyboardAlphabetComponent } from './keyboard-alphabet.component';

@Injectable()
export class KeyboardAlphabetComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(): Observable<string> {
    return new Observable((observer: Subscriber<string>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      // config.width = '80%';
      // config.height = '80%';

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(KeyboardAlphabetComponent, config)
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
