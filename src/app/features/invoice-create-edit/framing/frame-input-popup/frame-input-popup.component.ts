import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionComponentService } from '@features/selection-popup/selection-component.service';
import { SelectionItem } from '@features/selection-popup/selection-item/selection-item.interface';
import { Constants } from 'src/app/shared/constants';
import { ProductModel } from 'src/app/shared/models/product-model';
import { FacetingDataStoreService } from 'src/app/shared/services/data-store-services/faceting-data-store.service';
import { SandingDataStoreService } from 'src/app/shared/services/data-store-services/sanding-data-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

export interface DialogData {
  faceting: ProductModel;
  sanding: ProductModel;
}

@Component({
  selector: 'app-frame-input-popup',
  templateUrl: './frame-input-popup.component.html',
  styleUrls: ['./frame-input-popup.component.scss'],
  providers: [SelectionComponentService],
})
export class FrameInputPopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  faceting?: ProductModel;
  sanding?: ProductModel;

  constructor(
    private dialogRef: MatDialogRef<FrameInputPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef,
    private selectionComponentService: SelectionComponentService,
    private facetingData: FacetingDataStoreService,
    private sandingData: SandingDataStoreService
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
    this.subs.sink.facetingData = this.facetingData.entities.subscribe(
      (faces) => {
        this.selectionComponentService
          .openDialog(
            faces.map((f) => {
              return {
                oid: f.oid,
                name: f.name,
                selected: this.faceting?.oid === f.oid,
                uom: f.uom,
                pricePerUom: f.pricePerUom,
                cashRegisterNumber: f.cashRegisterNumber,
                thumbnailUrl: Constants.THUMBNAIL_FACETING,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.faceting = faces.filter((f) => f.oid === oid)[0];
            }
          });
      }
    );
  }

  selectSanding(): void {
    this.subs.sink.sandingData = this.sandingData.entities.subscribe(
      (sands) => {
        this.selectionComponentService
          .openDialog(
            sands.map((s) => {
              return {
                oid: s.oid,
                name: s.name,
                selected: this.sanding?.oid === s.oid,
                uom: s.uom,
                pricePerUom: s.pricePerUom,
                cashRegisterNumber: s.cashRegisterNumber,
                thumbnailUrl: Constants.THUMBNAIL_SANDING,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.sanding = sands.filter((s) => s.oid === oid)[0];
            }
          });
      }
    );
  }

  removeFromInvoiceItem(type: 'faceting' | 'sanding'): void {
    type === 'faceting'
      ? (this.faceting = undefined)
      : (this.sanding = undefined);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
