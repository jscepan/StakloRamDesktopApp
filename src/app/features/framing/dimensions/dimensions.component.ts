import { Component, OnInit } from '@angular/core';
import { SelectionComponentService } from '@features/selection-popup/selection-component.service';
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
    private selectionComponentService: SelectionComponentService
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

  inputNumber(): void {
    this.keyboardComponentService.openDialog().subscribe((text: string) => {
      console.log(text);
    });
  }
}
