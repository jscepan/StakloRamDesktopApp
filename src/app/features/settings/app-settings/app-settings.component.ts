import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import {
  AppSettingsService,
  Settings,
} from 'src/app/shared/services/app-settings.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit {
  items: Entity[] = [];
  settings: Settings;

  constructor(
    private appSettingsService: AppSettingsService,
    private route: Router,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.appSettingsService.settings.subscribe((settings) => {
      this.settings = settings;
      this.mapFormData(settings);
    });
  }

  mapFormData(settings: Settings): void {
    this.items.push(
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.decimalNumberSign,
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
        value: settings.thousandsNumberSign,
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
        value: settings.numberFormat,
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
        value: settings.dateFormat,
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
        value: settings.currencyFormat,
        label: { key: 'currencyFormat', value: 'currencyFormat' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.currencyDisplayValue,
        label: { key: 'currencyDisplayValue', value: 'currencyDisplayValue' },
      },
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.buttonSize,
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
        value: settings.fontSize,
        label: { key: 'fontSize', value: 'fontSize' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.fontSizeList,
        label: { key: 'fontSizeList', value: 'fontSizeList' },
      },
      {
        type: 'select',
        required: true,
        errorMessage: 'string',
        value: settings.language,
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
        value: settings.maxTrCount,
        label: { key: 'maxTrCount', value: 'maxTrCount' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.minSurfacem2,
        label: { key: 'minSurfacem2', value: 'minSurfacem2' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.defaultFrameWidth,
        label: { key: 'defaultFrameWidth', value: 'defaultFrameWidth' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.copies,
        label: { key: 'copies', value: 'copies' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.footer,
        label: { key: 'footer', value: 'footer' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.header,
        label: { key: 'header', value: 'header' },
      },
      {
        type: 'string',
        required: true,
        errorMessage: 'string',
        value: settings.printer,
        label: { key: 'printer', value: 'printer' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.passpartuWidth,
        label: { key: 'passpartuWidth', value: 'passpartuWidth' },
      },
      {
        type: 'number',
        required: true,
        errorMessage: 'string',
        value: settings.frameWidthHeight,
        label: { key: 'frameWidthHeight', value: 'frameWidthHeight' },
      }
    );
  }

  cancel(): void {
    this.route.navigate(['settings']);
  }

  submit(setting: Settings): void {
    this.appSettingsService.updateSettings(setting).subscribe(() => {
      this.globalService.showBasicAlert(
        MODE.success,
        this.translateService.instant('success'),
        this.translateService.instant('settingsSuccessfulyUpdated')
      );
      this.route.navigate(['settings']);
    });
  }
}
