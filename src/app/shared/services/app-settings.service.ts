import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UOM } from '../enums/uom-enum';
import { SubscriptionManager } from './subscription.manager';

export class AppSettings {
  formatSettings: {
    thousandsNumberSign: '.' | ',';
    decimalNumberSign: '.' | ',';
    numberFormat: '.000' | '.00';
    dateFormat: 'dd.mm.yyyy' | 'dd/mm/yyyy' | 'mm.dd.yyyy' | 'mm/dd/yyyy';
    currencyFormat: string;
    currencyDisplayValue: string;
  };
  applicationDesign: {
    buttonSize: 'big' | 'middle' | 'small';
    fontSize: number;
    fontSizeList: number;
    language: 'rs' | 'en';
  };
  basicSettings: {
    maxTrCount: number;
    minSurfacem2: number;
    defaultFrameWidth: number;
    passpartuWidth: number;
    frameWidthHeight: number;
    defaultUom: UOM;
  };
  printSettings: {
    copies: number;
    footer: string;
    header: string;
    printer: string;
  };
}

@Injectable()
export class AppSettingsService {
  private $settings: BehaviorSubject<AppSettings> =
    new BehaviorSubject<AppSettings>(new AppSettings());
  public settings: Observable<AppSettings> = this.$settings.asObservable();

  constructor() {
    // TODO get settings from database
    // this.$settings.next();
    this.$settings.next({
      formatSettings: {
        thousandsNumberSign: '.',
        decimalNumberSign: ',',
        numberFormat: '.000',
        dateFormat: 'dd.mm.yyyy',
        currencyFormat: 'RSD',
        currencyDisplayValue: 'din',
      },
      applicationDesign: {
        buttonSize: 'big',
        fontSize: 16,
        fontSizeList: 12,
        language: 'rs',
      },
      basicSettings: {
        maxTrCount: 5,
        minSurfacem2: 100,
        defaultFrameWidth: 100,
        passpartuWidth: 222,
        frameWidthHeight: 333,
        defaultUom: UOM.CENTIMETER,
      },
      printSettings: {
        copies: 1,
        footer: 'Hvala',
        header: 'StakloRam',
        printer: 'Neki stmapac',
      },
    });
  }

  public updateSettings(settings: AppSettings): Observable<void> {
    return new Observable((subscriber) => {
      // TODO save to database
      this.$settings.next(settings);
      return subscriber.next();
    });
  }
}
