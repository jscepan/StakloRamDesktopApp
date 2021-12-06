import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';

import { MeSweetAlertI } from './me-sweet-alert.interface';
import { MeSweetAlertComponent } from './me-sweet-alert.component';

@Injectable()
export class MeSweetAlertService {
  dataToReturn: Subject<MeSweetAlertI> = new Subject<MeSweetAlertI>();

  constructor(private dialog: MatDialog) {}

  openMeSweetAlert(data: MeSweetAlertI): MatDialogRef<MeSweetAlertComponent> {
    const dialogRef = this.dialog.open(MeSweetAlertComponent, {
      data,
      panelClass: 'sweet-alert-dialog',
    });

    dialogRef.componentInstance.eventOccurs.subscribe(
      (event: { eventName: string; payload: MeSweetAlertI }) => {
        if (
          event.eventName === 'submit' ||
          event.eventName === 'confirm' ||
          event.eventName === 'ok'
        ) {
          data.confirmed = true;
          dialogRef.close(data);
        } else if (event.eventName === 'cancel') {
          data.confirmed = false;
          dialogRef.close(data);
        }
      }
    );

    dialogRef.afterClosed().subscribe((alertData: MeSweetAlertI) => {
      this.dataToReturn.next(alertData);
    });

    return dialogRef;
  }

  getDataBackFromSweetAlert(): Observable<MeSweetAlertI> {
    return this.dataToReturn.asObservable();
  }
}
