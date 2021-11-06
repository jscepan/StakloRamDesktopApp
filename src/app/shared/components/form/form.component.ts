import { KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  formControls: { entity: Entity; formControl: FormControl }[] = [];
  matcher = new MyErrorStateMatcher();

  constructor() {}

  ngOnInit(): void {
    this.objectForm = new FormGroup({});

    this.formControls = [];

    this.items.forEach((item) => {
      // TODO set validators logic...
      let formControl = new FormControl(item.value, [Validators.required]);
      if (item.disabled) {
        formControl.disable();
      }
      this.formControls.push({
        entity: item,
        formControl,
      });
    });

    this.formControls.forEach((item) => {
      this.objectForm.addControl(item.entity.label.key, item.formControl);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
