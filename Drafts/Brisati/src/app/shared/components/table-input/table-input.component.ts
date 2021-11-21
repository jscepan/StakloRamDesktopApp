import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

export class Table {
  dataType: DataType[];
  data: Row[] = [];
}

export class DataType {
  type: 'string' | 'number' | 'select' = 'string';
  required?: boolean = false;
  errorMessage?: string;
  values?: KeyValue<string, string>[] = [];
  label: string;
  disabled?: boolean = false;
}

export class Row {
  values: (string | number)[];
}

@Component({
  selector: 'app-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.scss'],
})
export class TableInputComponent implements OnInit {
  @Input() dataModel: Table;

  constructor() {}

  ngOnInit(): void {}
}
