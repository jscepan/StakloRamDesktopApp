import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdditionalInformation } from 'src/app/shared/models/invoice-model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

export interface DialogData {
  selectedOids: string[];
  isSingleSelection: boolean;
  additionalInformation: AdditionalInformation;
  invoiceAmount: number;
}

@Component({
  selector: 'app-print-invoice-popup',
  templateUrl: './print-invoice-popup.component.html',
  styleUrls: ['./print-invoice-popup.component.scss'],
  providers: [],
})
export class PrintInvoicePopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs = new SubscriptionManager();

  invoiceForm: FormGroup;

  public additionalInformation: AdditionalInformation;
  public invoiceAmount: number;

  constructor(
    private dialogRef: MatDialogRef<PrintInvoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.additionalInformation = data.additionalInformation;
    this.invoiceAmount = data.invoiceAmount || 0;
  }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      buyerName: new FormControl(this.additionalInformation.buyerName, []),
      buyerPhone: new FormControl(this.additionalInformation.buyerPhone, []),
      advancePayment: new FormControl(
        this.additionalInformation.advancePayment,
        []
      ),
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public save(): void {
    this.dialogRef.close(this.additionalInformation);
  }

  public cancelSave(): void {
    this.dialogRef.close();
  }

  setFullPayment(): void {
    const v = this.invoiceForm.get('advancePayment');
    v.setValue(this.invoiceAmount);
  }

  increasePaymentFor(value: number): void {
    const v = this.invoiceForm.get('advancePayment');
    v.setValue(v.value + value);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
