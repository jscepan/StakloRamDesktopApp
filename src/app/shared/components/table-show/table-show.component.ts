import { Component, Input, OnInit } from '@angular/core';

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
  gridTemplateColumnsCssStyle: string = 'auto ';

  constructor() {}

  ngOnInit(): void {
    this.dataModel.header.forEach(() => {
      this.gridTemplateColumnsCssStyle += 'auto ';
    });
  }
}
