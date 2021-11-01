import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  selectedOids: string[];
  isSingleSelection: boolean;
}

@Component({
  selector: 'app-selection-popup',
  templateUrl: './selection-popup.component.html',
  styleUrls: ['./selection-popup.component.scss'],
})
export class SelectionPopupComponent implements OnInit, AfterViewInit {
  public selectedOids: string[] = [];
  public isSingleSelection: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<SelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.selectedOids = data?.selectedOids || [];
    this.isSingleSelection = !(data.isSingleSelection === false);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  // public get selection(): SelectionManager<MeNewCollectionCardI> | undefined {
  //   return this.collectionsView?.selection;
  // }

  // public toggleShowSelected(): void {
  //   if (this.selection) {
  //     this.selection.showSelected = !this?.selection.showSelected;
  //   }
  // }

  // public clearSelection(): void {
  //   this.selection?.clearSelection();
  // }

  public saveSelection(): void {
    this.dialogRef.close(this.selectedOids);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }
}
