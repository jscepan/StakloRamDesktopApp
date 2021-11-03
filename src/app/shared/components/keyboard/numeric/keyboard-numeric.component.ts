import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-numeric',
  templateUrl: './keyboard-numeric.component.html',
  styleUrls: ['./keyboard-numeric.component.scss'],
})
export class KeyboardNumericComponent implements OnInit {
  title: string = '';
  uom: string = '';
  value: string = '0';
  showNextOperationButton: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  numberClicked(event: string): void {
    if (this.value === '0') {
      this.value = '';
    }

    // TODO check number value

    this.value += event;
  }
}
