import { KeyValue } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  items: Entity[];
}

export class Entity {
  type: 'string' | 'number' | 'select' = 'string';
  required?: boolean = false;
  errorMessage?: string;
  value: string;
  optionalValues?: KeyValue<string, string>[];
  label: string;
  disabled?: boolean = false;
}

@Component({
  selector: 'app-create-edit-popup',
  templateUrl: './create-edit-popup.component.html',
  styleUrls: ['./create-edit-popup.component.scss'],
})
export class CreateEditPopupComponent implements OnInit, AfterViewInit {
  public items: Entity[] = [];
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

  handleItemClick(card: Entity): void {
    this.dialogRef.close(card);
  }

  public saveSelection(): void {
    this.dialogRef.close(this.items);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }
}
