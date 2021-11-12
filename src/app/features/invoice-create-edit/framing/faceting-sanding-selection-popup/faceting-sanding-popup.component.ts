import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from 'src/app/shared/models/product-model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

export interface DialogData {
  faceting: ProductModel;
  sanding: ProductModel;
}

@Component({
  selector: 'app-faceting-sanding-popup',
  templateUrl: './faceting-sanding-popup.component.html',
  styleUrls: ['./faceting-sanding-popup.component.scss'],
})
export class FacetingSandingPopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  faceting?: ProductModel;
  sanding?: ProductModel;

  constructor(
    private dialogRef: MatDialogRef<FacetingSandingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.faceting = data.faceting;
    this.sanding = data.sanding;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public saveSelection(): void {
    this.dialogRef.close({ faceting: this.faceting, sanding: this.sanding });
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  selectFaceting(): void {
    // TODO
  }

  selectSanding(): void {
    // TODO
  }

  removeFromInvoiceItem(type: 'faceting' | 'sanding'): void {
    // TODO
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
