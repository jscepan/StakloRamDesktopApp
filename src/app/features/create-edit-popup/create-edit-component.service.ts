import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import {
  CreateEditPopupComponent,
  Entity,
} from './create-edit-popup.component';

@Injectable()
export class CreateEditComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(items: Entity[]): Observable<Entity[]> {
    return new Observable((observer: Subscriber<Entity[]>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      // config.width = '80%';
      // config.height = '80%';

      config.data = {
        items,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(CreateEditPopupComponent, config)
        .afterClosed()
        .subscribe(
          (items: Entity[]) => {
            observer.next(items);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
