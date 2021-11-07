import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionItem } from './selection-item/selection-item.interface';

export interface DialogData {
  selectedOids: string[];
  isSingleSelection: boolean;
  items: SelectionItem[];
}

@Component({
  selector: 'app-selection-popup',
  templateUrl: './selection-popup.component.html',
  styleUrls: ['./selection-popup.component.scss'],
})
export class SelectionPopupComponent implements OnInit, AfterViewInit {
  public selectedOids: string[] = [];
  public isSingleSelection: boolean = true;
  public items: SelectionItem[] = [];

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

  handleItemClick(card: SelectionItem): void {
    this.dialogRef.close(card.oid);
  }

  public saveSelection(): void {
    this.dialogRef.close(this.selectedOids);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }
}
