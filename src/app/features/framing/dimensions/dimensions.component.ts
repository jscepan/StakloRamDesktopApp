import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionPopupComponent } from '@features/selection-popup/selection-popup.component';
import { Observable, Subscriber } from 'rxjs';
import { SubscriptionManager } from 'src/app/services/subscription.manager';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss'],
})
export class DimensionsComponent implements OnInit {
  private subs = new SubscriptionManager();

  dataModel: any = {
    count: 1,
    isChecked: false,
    width: 0,
    height: 0,
    glass: { displayValue: '' },
    passpartu: { displayValue: '' },
    mirror: { displayValue: '' },
  };

  constructor(private _matDialog: MatDialog) {}

  ngOnInit(): void {}

  select(type: string): void {
    switch (type) {
      case 'glass':
        this.subs.sink = this.openDialog().subscribe(() => {});
        break;
      case 'passpartu':
        this.openDialog();
        break;
      case 'mirror':
        this.openDialog();
        break;
    }
  }

  openDialog(): Observable<void> {
    console.log('otvaram');
    return new Observable((observer: Subscriber<void>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      config.width = '80%';
      config.height = '80%';

      const selectedOids: string[] = [];
      config.data = {
        selectedOids,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(SelectionPopupComponent, config)
        .afterClosed()
        .subscribe(
          (oid: string) => {
            console.log(oid);
            observer.next();
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
