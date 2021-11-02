import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { SubscriptionManager } from 'src/app/services/subscription.manager';
import { KeyboardAlphabetComponent } from './alphabet/keyboard-alphabet.component';
import { KeyboardNumericComponent } from './numeric/keyboard-numeric.component';

@Injectable()
export class KeyboardComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(type: 'alphabet' | 'numeric'): Observable<string> {
    return new Observable((observer: Subscriber<string>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      config.width = '80%';
      config.height = '80%';

      config.data = {
        type,
      };

      let component;
      type === 'alphabet'
        ? (component = KeyboardAlphabetComponent)
        : (component = KeyboardNumericComponent);

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(component, config)
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
