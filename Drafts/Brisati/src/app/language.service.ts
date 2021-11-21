import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static defaultLanguage = 'rs';
  public supportedLanguages = ['en', 'rs'];

  public selectedLanguage!: string;

  constructor(private translateService: TranslateService) {
    let selectedLanguage = localStorage.getItem('currentLanguageStakloRam');
    if (!selectedLanguage) {
      selectedLanguage = LanguageService.defaultLanguage;
    }
    this.changeLanguage(selectedLanguage);
  }

  changeLanguage(languageCode: string): void {
    this.selectedLanguage = languageCode;
    this.translateService.use(languageCode);
    localStorage.setItem('currentLanguageStakloRam', languageCode);
  }
}
