import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UOM } from '../enums/uom-enum';
import { SubscriptionManager } from './subscription.manager';

export class Settings {
  decimalNumberSign: '.' | ',';
  thousandsNumberSign: '.' | ',';
  numberFormat: '.000' | '.00';
  dateFormat: 'dd.mm.yyyy' | 'dd/mm/yyyy' | 'mm.dd.yyyy' | 'mm/dd/yyyy';
  currencyFormat: string;
  currencyDisplayValue: string;
  buttonSize: 'big' | 'middle' | 'small';
  fontSize: number;
  fontSizeList: number;
  language: 'rs' | 'en';
  maxTrCount: number;
  minSurfacem2: number;
  defaultFrameWidth: number;
  copies: number;
  footer: string;
  header: string;
  printer: string;
  passpartuWidth: number;
  frameWidthHeight: number;
  defaultUom: UOM;
}

@Injectable()
export class AppSettingsService {
  private subs = new SubscriptionManager();

  private $settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(
    new Settings()
  );
  public settings: Observable<Settings> = this.$settings.asObservable();

  constructor() {
    console.log('INICIJALIZACIJA');
    // TODO get settings from database
    // this.$settings.next();
    this.$settings.next({
      decimalNumberSign: ',',
      thousandsNumberSign: '.',
      numberFormat: '.000',
      dateFormat: 'dd.mm.yyyy',
      currencyFormat: 'RSD',
      currencyDisplayValue: 'din',
      buttonSize: 'big',
      fontSize: 16,
      fontSizeList: 12,
      language: 'rs',
      maxTrCount: 5,
      minSurfacem2: 100,
      defaultFrameWidth: 100,
      copies: 1,
      footer: 'Hvala',
      header: 'StakloRam',
      printer: 'Neki stmapac',
      passpartuWidth: 222,
      frameWidthHeight: 333,
      defaultUom: UOM.CENTIMETER,
    });
  }

  public updateSettings(settings: Settings): Observable<void> {
    return new Observable((subscriber) => {
      // TODO save to database
      this.$settings.next(settings);
      return subscriber.next();
    });
  }
}
