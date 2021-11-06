import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  fontSize: string;
  languages: string[] = ['en', 'rs'];
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

  objectForm: FormGroup;

  constructor(
    private appSettingsService: AppSettingsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.appSettingsService.settings.subscribe((settings) => {
      this.settings = settings;
      this.fontSize =
        settings.fontSizeList && settings.fontSizeList > 0
          ? settings.fontSizeList + 'px'
          : '16px';
    });
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

  save(): void {
    this.appSettingsService.setNewSettings(this.settings);
    this.route.navigate(['settings']);
  }
}
