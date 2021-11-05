import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UOM } from '../enums/uom-enum';
import { SubscriptionManager } from './subscription.manager';

export class Settings {
  decimalNumberSign: '.' | ',' = ',';
  thousandsNumberSign: '.' | ',' = '.';
  numberFormat: '.000' | '.00' = '.000';
  dateFormat: 'dd.mm.yyyy' | 'dd/mm/yyyy' | 'mm.dd.yyyy' | 'mm/dd/yyyy' =
    'dd.mm.yyyy';
  currencyFormat: string = 'RSD';
  currencyDisplayValue: string = 'din';
  buttonSize: 'big' | 'middle' | 'small' = 'big';
  fontSize: number = 26;
  fontSizeList: number = 16;
  languages: string[] = ['en', 'rs'];
  maxTrCount: number = 5;
  minSurfacem2: number = 25;
  defaultFrameWidth: number = 100;
  copies: number = 1;
  footer: string = 'Hvala';
  header: string = 'StakloRam';
  printer: string = 'Neki stampac';
  passpartuWidth: number = 333;
  frameWidthHeight: number = 222;
  defaultUom: UOM = UOM.CENTIMETER;
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
