import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-alphabet',
  templateUrl: './keyboard-alphabet.component.html',
  styleUrls: ['./keyboard-alphabet.component.scss'],
})
export class KeyboardAlphabetComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  click(character: string): void {}
}
