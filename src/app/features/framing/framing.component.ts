import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-framing',
  templateUrl: './framing.component.html',
  styleUrls: ['./framing.component.scss'],
})
export class FramingComponent implements OnInit {
  @ViewChild('stepper') stepper;

  constructor() {}

  ngOnInit(): void {}

  nextStep(): void {}

  previousStep(): void {}

  finishStep(): void {}
}
