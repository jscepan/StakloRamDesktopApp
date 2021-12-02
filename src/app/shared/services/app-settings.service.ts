import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageService } from 'src/app/language.service';

export class AppSettings {
  thousandsNumberSign: '.' | ',';
  decimalNumberSign: '.' | ',';
  dateFormat: 'dd.mm.yyyy' | 'dd/mm/yyyy' | 'mm.dd.yyyy' | 'mm/dd/yyyy';
  currencyFormat: string;
  currencyDisplayValue: string;
  language: 'rs' | 'en';
  copies: number;
  footer: string;
  header: string;
  printer: string;
}

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  private $settings: BehaviorSubject<AppSettings> =
    new BehaviorSubject<AppSettings>(new AppSettings());
  public settings: Observable<AppSettings> = this.$settings.asObservable();

  constructor(private languageService: LanguageService) {
    // TODO get settings from database
    // this.$settings.next();
    this.$settings.next({
      thousandsNumberSign: '.',
      decimalNumberSign: ',',
      dateFormat: 'dd.mm.yyyy',
      currencyFormat: 'RSD',
      currencyDisplayValue: 'din',
      language: 'rs',
      copies: 1,
      footer: 'Hvala',
      header: 'StakloRam',
      printer: 'Neki stampac',
    });
  }

  public updateSettings(settings: AppSettings): Observable<void> {
    return new Observable((subscriber) => {
      // TODO save to database
      this.languageService.changeLanguage(settings.language);
      this.$settings.next(settings);
      return subscriber.next();
    });
  }
}
