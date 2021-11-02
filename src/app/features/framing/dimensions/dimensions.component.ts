import { Component, OnInit } from '@angular/core';
import { SelectionComponentService } from '@features/selection-popup/selection-component.service';
import { SubscriptionManager } from 'src/app/services/subscription.manager';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss'],
  providers: [SelectionComponentService],
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

  constructor(private selectionComponentService: SelectionComponentService) {}

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
}
