import { Component, OnInit } from '@angular/core';
import { SelectionComponentService } from '@features/selection-popup/selection-component.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { SubscriptionManager } from 'src/app/services/subscription.manager';
import { KeyboardNumericComponentService } from 'src/app/shared/components/keyboard/numeric/keyboard-numeric.component.service';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss'],
  providers: [SelectionComponentService, KeyboardNumericComponentService],
})
export class DimensionsComponent implements OnInit {
  private subs = new SubscriptionManager();

  dataModel: any = {
    count: 1,
    isChecked: false,
    width: 0,
    height: 0,
    glass: { displayValue: '' },
    passpartu: { displayValue: '' },
    mirror: { displayValue: '' },
  };

  constructor(
    private keyboardComponentService: KeyboardNumericComponentService,
    private selectionComponentService: SelectionComponentService,
    private translateService: TranslateService,
    private appSettingsService: AppSettingsService
  ) {}

  ngOnInit(): void {}

  select(type: string): void {
    switch (type) {
      case 'glass':
        this.subs.sink = this.selectionComponentService
          .openDialog([{ oid: 'ddfdf', displayValue: 'xxx', value: 'x' }])
          .subscribe((data) => {
            console.log(data);
          });
        break;
      case 'passpartu':
        this.selectionComponentService.openDialog([]);
        break;
      case 'mirror':
        this.selectionComponentService.openDialog([]);
        break;
    }
  }

  inputNumber(type: 'width' | 'height' | 'count'): void {
    switch (type) {
      case 'width':
        break;
      case 'height':
        break;
      default:
        this.subs.sink = this.openNumberDialog().subscribe((result) => {
          if (
            !isNaN(+result) && // is number
            +result >= 1 && // is bigger than 0
            +result - Math.floor(+result) !== 0 // isn't decimal
          ) {
            this.dataModel.count = +result;
          } else {
            // TODO alert on error
          }
        });
    }
  }

  private openWidthDialog(): Observable<string> {
    return this.keyboardComponentService.openDialog(
      this.translateService.instant('insertDimensions'),
      this.appSettingsService.getSettings().defaultUom,
      true,
      this.translateService.instant('insertDimensions')
    );
  }

  private openHeightDialog(): Observable<string> {
    return this.keyboardComponentService.openDialog(
      this.translateService.instant('insertDimensions'),
      this.appSettingsService.getSettings().defaultUom,
      true,
      this.translateService.instant('insertDimensions')
    );
  }

  private openNumberDialog(): Observable<string> {
    return this.keyboardComponentService.openDialog(
      this.translateService.instant('insertCount'),
      '1',
      false,
      this.translateService.instant('insertCount')
    );
  }
}
