import { KeyValue } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  items: Entity[];
}

export class Entity {
  oid: string;
  type: 'string' | 'number' | 'select' = 'string';
  required?: boolean = false;
  errorMessage?: string;
  value: string;
  optionalValues?: KeyValue<string, string>[];
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
  selector: 'app-create-edit-popup',
  templateUrl: './create-edit-popup.component.html',
  styleUrls: ['./create-edit-popup.component.scss'],
})
export class CreateEditPopupComponent implements OnInit, AfterViewInit {
  private items: Entity[] = [];
  isEdit: boolean = false;

  objectForm: FormGroup;
  formControls: { entity: Entity; formControl: FormControl }[] = [];
  matcher = new MyErrorStateMatcher();

  constructor(
    private dialogRef: MatDialogRef<CreateEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.items = data.items;
    this.createForm();
  }

  ngOnInit(): void {
    this.isEdit = this.items && this.items.length > 0;
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  handleItemClick(card: Entity): void {
    this.dialogRef.close(card);
  }

  public saveSelection(): void {
    this.dialogRef.close(this.objectForm.value);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  createForm(): void {
    this.objectForm = new FormGroup({});

    this.formControls = [];

    this.data.items.forEach((item) => {
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
}
