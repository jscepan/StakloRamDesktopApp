import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class TableShow {
  header: string[] = [];
  data: string[] = [];
}

@Component({
  selector: 'app-table-show',
  templateUrl: './table-show.component.html',
  styleUrls: ['./table-show.component.scss'],
})
export class TableShowComponent implements OnInit {
  @Input() dataModel: TableShow;
  @Output() editData: EventEmitter<string> = new EventEmitter<string>();
  gridTemplateColumnsCssStyle: string = 'auto ';

  constructor() {}

  ngOnInit(): void {
    this.dataModel.header.forEach(() => {
      this.gridTemplateColumnsCssStyle += 'auto ';
    });
  }

  clickEditData(i: number): void {
    console.log('xxxxxxxxxx' + i);
    this.editData.emit(
      this.dataModel.data[i + 1 - this.dataModel.header.length]
    );
  }
}
