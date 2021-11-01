import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss'],
})
export class DimensionsComponent implements OnInit {
  dataModel: any = {
    count: 1,
    isChecked: false,
    width: 0,
    height: 0,
    glass: { displayValue: '' },
    passpartu: { displayValue: '' },
    mirror: { displayValue: '' },
  };

  constructor() {}

  ngOnInit(): void {}

  select(type: string): void {
    switch (type) {
      case 'glass':
        this.openDialog();
        break;
      case 'passpartu':
        this.openDialog();
        break;
      case 'mirror':
        this.openDialog();
        break;
    }
  }

  openDialog(): void {
    console.log('otvaram');
  }
}
