import { KeyValue } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Entity } from 'src/app/shared/components/form/form.component';

export interface DialogData {
  items: Entity[];
}

@Component({
  selector: 'app-create-edit-popup',
  templateUrl: './create-edit-popup.component.html',
  styleUrls: ['./create-edit-popup.component.scss'],
})
export class CreateEditPopupComponent implements OnInit, AfterViewInit {
  items: Entity[] = [];
  isEdit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.items = data.items;
  }

  ngOnInit(): void {
    this.isEdit = this.items && this.items.length > 0;
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  formClick(event: {
    eventName: string;
    value: KeyValue<string, string>[];
  }): void {
    if (event.eventName === 'cancel') {
      this.dialogRef.close();
    } else if (event.eventName === 'submit') {
      this.dialogRef.close(event.value);
    }
  }
}
