import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldModel } from 'src/app/shared/models/field-model';

export interface DialogData {
  selectedOids: string[];
  isSingleSelection: boolean;
  items: FieldModel[];
}

@Component({
  selector: 'app-selection-popup',
  templateUrl: './selection-popup.component.html',
  styleUrls: ['./selection-popup.component.scss'],
})
export class SelectionPopupComponent implements OnInit, AfterViewInit {
  public selectedOids: string[] = [];
  public isSingleSelection: boolean = true;
  public items: FieldModel[] = [];

  constructor(
    private dialogRef: MatDialogRef<SelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.selectedOids = data?.selectedOids || [];
    this.isSingleSelection = !(data.isSingleSelection === false);
    this.items = data.items;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  handleItemClick(card: FieldModel): void {
    this.dialogRef.close(card.oid);
  }

  public saveSelection(): void {
    this.dialogRef.close(this.selectedOids);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }
}
