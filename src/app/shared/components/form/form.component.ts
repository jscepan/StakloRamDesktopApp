import { KeyValue } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder } from '../../helpers/form.builder';
import { SubscriptionManager } from '../../services/subscription.manager';

export class Entity {
  // oid: string;
  type: 'string' | 'number' | 'select' = 'string';
  required?: boolean = false;
  errorMessage?: string;
  value: string | number;
  optionalValues?: KeyValue<string, string | number>[];
  label: KeyValue<string, string>;
  disabled?: boolean = false;
}

export class EntityFormControl {
  entity: Entity;
  formControl: FormControl;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  @Input() items: Entity[] = [];
  public objectForm: FormGroup;
  formControls: EntityFormControl[] = [];
  matcher = new MyErrorStateMatcher();
  constructor() {}

  ngOnInit(): void {
    const formBuilderService = new FormBuilder(this.items);
    this.objectForm = formBuilderService.objectForm;
    this.formControls = formBuilderService.formControls;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
