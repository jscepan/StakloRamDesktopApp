import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/shared/components/table-input/table-input.component';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss'],
})
export class FramesComponent implements OnInit {
  table: Table = {
    header: ['Sifra', 'Naziv', 'JM', 'CPJM', 'Sirina rama mm', 'Sifra'],
    dataType: [
      { type: 'number' },
      { type: 'string' },
      {
        type: 'select',
        values: [
          { key: 'duzina', value: 'Duzina' },
          { key: 'sirina', value: 'Sirina' },
          { key: 'visina', value: 'Visina' },
          { key: 'dubina', value: 'Dubina' },
        ],
      },
      { type: 'number' },
      { type: 'number' },
      { type: 'number' },
    ],
    data: [
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
      { values: [1, 'RAM', 'Duzina', '500', '120', '233'] },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
