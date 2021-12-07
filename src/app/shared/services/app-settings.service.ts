import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageService } from 'src/app/language.service';
import { AppSettingsWebService } from './web-services/app-settings.service';

export class AppSettings {
  thousandsNumberSign: '.' | ',';
  decimalNumberSign: '.' | ',';
  dateFormat: 'dd.mm.yyyy' | 'dd/mm/yyyy' | 'mm.dd.yyyy' | 'mm/dd/yyyy';
  currencyFormat: string;
  currencyDisplayValue: string;
  language: 'rs' | 'en';
  minGlassSurface: number;
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
  fs: any;

  constructor(
    private languageService: LanguageService,
    private webService: AppSettingsWebService<AppSettings>
  ) {
    this.webService.getSettings().subscribe((sett) => {
      this.$settings.next(sett);
    });
  }

  public updateSettings(settings: AppSettings): Observable<void> {
    return new Observable((subscriber) => {
      this.webService.updateSettings(settings).subscribe((settings) => {
        if (settings) {
          this.languageService.changeLanguage(settings.language);
          this.$settings.next(settings);
          return subscriber.next();
        }
      });
    });
  }
}
