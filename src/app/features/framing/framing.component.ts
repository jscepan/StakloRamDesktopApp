import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-framing',
  templateUrl: './framing.component.html',
  styleUrls: ['./framing.component.scss'],
})
export class FramingComponent implements OnInit {
  @ViewChild('stepper') stepper;
  dimensionsInputAttributeForm!: FormGroup;
  generalInfoLayoutGroups: [] = [];

  constructor() {}

  ngOnInit(): void {
    this.dimensionsInputAttributeForm = new FormGroup({});
  }

  cancel(): void {}

  nextStep(): void {}

  previousStep(): void {}

  finishStep(): void {}

  // On tab index change set previous step form as touched
  markFormAsTouched(changeObj: StepperSelectionEvent): void {
    changeObj.previouslySelectedStep.stepControl?.markAllAsTouched();
  }

  checkStepBeforeSwitch(switchedTo: number): void {
    console.log(switchedTo);
  }
}
