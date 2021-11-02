import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class Settings {
  decimalNumberSign: string;
  thousandsNumberSign: string;
  numberFormat: string;
  dateFormat: string;
  currencyFormat: string;
  currencyDisplayValue: string;
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
}

@Injectable()
export class ConstantsService {
  private settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(
    new Settings()
  );
  public readonly SETTINGS: Observable<Settings> = this.settings.asObservable();

  public setNewSettings(settings: Settings): void {
    this.settings.next(settings);
  }
}
