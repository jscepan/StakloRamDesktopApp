import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MeBasicAlertService } from '../components/me-basic-alert/me-basic-alert.service';
import {
  MeBasicAlertI,
  MODE,
} from '../components/me-basic-alert/me-basic-alert.interface';
import { ErrorResponseI } from '../interfaces/error-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(
    private basicAlertService: MeBasicAlertService,
    private translateService: TranslateService
  ) {}

  // -- BASIC ALERT: general usage
  showBasicAlert(mode: MODE, title: string, content: string): void {
    const basicAlertData: MeBasicAlertI = {
      mode,
      title,
      content,
    };

    this.basicAlertService.openBasicAlert(basicAlertData);
  }

  // BASIC ALERT: default error handling
  showBasicAlertDefaultError(error: ErrorResponseI): void {
    this.showBasicAlert(MODE.error, error.error.title, error.error.details);
  }

  // BASIC ALERT: vast usage empty file error
  showBasicAlertEmptyFile(): void {
    this.showBasicAlert(
      MODE.error,
      this.translateService.instant('emptyDocument'),
      this.translateService.instant('noFile')
    );
  }
}
