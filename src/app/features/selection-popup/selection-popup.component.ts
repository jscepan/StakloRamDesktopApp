import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { SelectionItem } from './selection-item/selection-item.interface';

export interface DialogData {
  selectedOids: string[];
  isSingleSelection: boolean;
  items: SelectionItem[];
  itemSize?: 'big' | 'middle' | 'small';
}

@Component({
  selector: 'app-selection-popup',
  templateUrl: './selection-popup.component.html',
  styleUrls: ['./selection-popup.component.scss'],
})
export class SelectionPopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  public selectedOids: string[] = [];
  public isSingleSelection: boolean = true;
  public items: SelectionItem[] = [];
  itemSize?: 'big' | 'middle' | 'small';
  searchValue: string = '';

  constructor(
    private dialogRef: MatDialogRef<SelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.selectedOids = data?.selectedOids || [];
    this.isSingleSelection = !(data.isSingleSelection === false);
    this.items = data.items;
    this.itemSize = data.itemSize || 'big';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  searchInputEvent(searchValue: string): void {
    this.searchValue = searchValue;
  }

  isSearchSatisfied(name: string): boolean {
    return (
      !this.searchValue ||
      name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
