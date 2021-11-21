import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MeBasicAlertI } from '../me-basic-alert/me-basic-alert.interface';
import { MeBasicAlertComponent } from '../me-basic-alert/me-basic-alert.component';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class MeAlertBoxService {
  public showMsg$: Subject<{
    // tslint:disable-next-line:no-any
    component: ComponentType<any>;
    alertData: MeBasicAlertI;
    duration: number;
  }> = new Subject();

  constructor() {}

  showBasicAlert(basicAlertData: MeBasicAlertI, duration: number = 7000): void {
    this._showMessage(MeBasicAlertComponent, basicAlertData, duration);
  }

  private _showMessage(
    // tslint:disable-next-line:no-any
    component: ComponentType<any>,
    alertData: MeBasicAlertI,
    duration: number
  ): void {
    this.showMsg$.next({ component, alertData, duration });
  }
}
