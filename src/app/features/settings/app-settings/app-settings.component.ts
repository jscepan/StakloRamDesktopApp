import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UOM } from 'src/app/shared/enums/uom-enum';
import {
  AppSettingsService,
  Settings,
} from 'src/app/shared/services/app-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit {
  fontSize: string = '16px';
  decimalNumberSigns: string[] = ['.', ','];
  thousandsNumberSigns: string[] = ['.', ','];
  numberFormats: string[] = ['.000', '.00'];
  dateFormats: string[] = [
    'dd.mm.yyyy',
    'dd/mm/yyyy',
    'mm.dd.yyyy',
    'mm/dd/yyyy',
  ];
  uomValues: UOM[] = [UOM.CENTIMETER, UOM.MILIMETER, UOM.NUMBER];

  settings: Settings;

  constructor(
    private appSettingsService: AppSettingsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.fontSize =
      this.appSettingsService.getSettings().fontSizeList &&
      this.appSettingsService.getSettings().fontSizeList > 0
        ? this.appSettingsService.getSettings().fontSizeList + 'px'
        : '16px';

    this.settings = this.appSettingsService.getSettings();
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

  save(): void {
    this.appSettingsService.setNewSettings(this.settings);
    this.route.navigate(['/']);
  }
}
