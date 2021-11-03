import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { MeBasicAlertComponent } from './me-basic-alert.component';

import { MeBasicAlertEventsTypes, MeBasicAlertI } from './me-basic-alert.interface';

@Injectable()
export class MeBasicAlertService {
  constructor(private snackBar: MatSnackBar, private basicAlertConfiguration: MatSnackBarConfig) {}

  openBasicAlert(data: MeBasicAlertI): void {
    const barRef: MatSnackBarRef<MeBasicAlertComponent> = this.snackBar.openFromComponent(MeBasicAlertComponent, {
      ...this.basicAlertConfiguration,
      data
    });

    barRef.instance.eventOccurs.pipe(takeUntil(barRef.afterDismissed())).subscribe((event: { eventName: string }) => {
      if (event.eventName === MeBasicAlertEventsTypes.EXIT) {
        this.snackBar.dismiss();
      }
    });
  }
}
