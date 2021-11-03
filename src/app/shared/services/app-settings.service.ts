import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UOM } from '../enums/uom-enum';
import { SubscriptionManager } from './subscription.manager';

export class Settings {
  decimalNumberSign: string;
  thousandsNumberSign: string;
  numberFormat: string;
  dateFormat: string;
  currencyFormat: string;
  currencyDisplayValue: string;
  buttonSize: 'big' | 'middle' | 'small' = 'big';
  fontSize: number;
  fontSizeList: number;
  maxTrCount: number;
  minSurfacem2: number;
  defaultFrameWidth: number;
  copies: number;
  footes: string;
  header: string;
  printer: string;
  passpartuWidth: string;
  frameWidthHeight: string;
  defaultUom: UOM;
}

@Injectable()
export class AppSettingsService {
  private subs = new SubscriptionManager();

  private $settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(
    new Settings()
  );
  private settings: Settings;

  public getSettings(): Settings {
    return this.settings;
  }

  constructor() {
    this.subs.sink = this.$settings.asObservable().subscribe((settings) => {
      this.settings = settings;
    });
  }

  public setNewSettings(settings: Settings): void {
    this.$settings.next(settings);
  }
}
