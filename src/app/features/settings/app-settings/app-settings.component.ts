import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import {
  AppSettingsService,
  AppSettings,
} from 'src/app/shared/services/app-settings.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  items: Entity[] = [];
  settings: AppSettings;

  constructor(
    private appSettingsService: AppSettingsService,
    private route: Router,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subs.sink.settings = this.appSettingsService.settings.subscribe(
      (settings) => {
        this.settings = settings;
        this.mapFormData(settings);
      }
    );
  }

  cancel(): void {
    this.route.navigate(['settings']);
  }

  submit(setting: AppSettings): void {
    this.subs.sink.updateSettings = this.appSettingsService
      .updateSettings(setting)
      .subscribe(() => {
        this.globalService.showBasicAlert(
          MODE.success,
          this.translateService.instant('success'),
          this.translateService.instant('settingsSuccessfulyUpdated')
        );
        this.route.navigate(['settings']);
      });
  }

  mapFormData(settings: AppSettings): void {
    this.items.push(
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.formatSettings.decimalNumberSign,
        optionalValues: [
          { key: '.', value: '.' },
          { key: ',', value: ',' },
        ],
        label: { key: 'decimalNumberSign', value: 'decimalNumberSign' },
      },
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.formatSettings.thousandsNumberSign,
        optionalValues: [
          { key: '.', value: '.' },
          { key: ',', value: ',' },
        ],
        label: { key: 'thousandsNumberSign', value: 'thousandsNumberSign' },
      },
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.formatSettings.numberFormat,
        optionalValues: [
          { key: '.000', value: '.000' },
          { key: '.00', value: '.00' },
        ],
        label: { key: 'numberFormat', value: 'numberFormat' },
      },
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.formatSettings.dateFormat,
        optionalValues: [
          { key: 'dd.mm.yyyy', value: 'dd.mm.yyyy' },
          { key: 'dd/mm/yyyy', value: 'dd/mm/yyyy' },
          { key: 'mm.dd.yyyy', value: 'mm.dd.yyyy' },
          { key: 'mm/dd/yyyy', value: 'mm/dd/yyyy' },
        ],
        label: { key: 'dateFormat', value: 'dateFormat' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.formatSettings.currencyFormat,
        label: { key: 'currencyFormat', value: 'currencyFormat' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.formatSettings.currencyDisplayValue,
        label: { key: 'currencyDisplayValue', value: 'currencyDisplayValue' },
      },
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.applicationDesign.buttonSize,
        optionalValues: [
          { key: 'big', value: 'big' },
          { key: 'middle', value: 'middle' },
          { key: 'small', value: 'small' },
        ],
        label: { key: 'buttonSize', value: 'buttonSize' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.applicationDesign.fontSize,
        label: { key: 'fontSize', value: 'fontSize' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.applicationDesign.fontSizeList,
        label: { key: 'fontSizeList', value: 'fontSizeList' },
      },
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.applicationDesign.language,
        optionalValues: [
          { key: 'rs', value: 'rs' },
          { key: 'en', value: 'en' },
        ],
        label: { key: 'language', value: 'language' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.basicSettings.maxTrCount,
        label: { key: 'maxTrCount', value: 'maxTrCount' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.basicSettings.minSurfacem2,
        label: { key: 'minSurfacem2', value: 'minSurfacem2' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.basicSettings.defaultFrameWidth,
        label: { key: 'defaultFrameWidth', value: 'defaultFrameWidth' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.printSettings.copies,
        label: { key: 'copies', value: 'copies' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.printSettings.footer,
        label: { key: 'footer', value: 'footer' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.printSettings.header,
        label: { key: 'header', value: 'header' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.printSettings.printer,
        label: { key: 'printer', value: 'printer' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.basicSettings.passpartuWidth,
        label: { key: 'passpartuWidth', value: 'passpartuWidth' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.basicSettings.frameWidthHeight,
        label: { key: 'frameWidthHeight', value: 'frameWidthHeight' },
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
