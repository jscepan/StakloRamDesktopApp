import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { KeyboardAlphabetComponentService } from 'src/app/shared/components/keyboard/alphabet/keyboard-alphabet.component.service';
import { KeyboardNumericComponentService } from 'src/app/shared/components/keyboard/numeric/keyboard-numeric.component.service';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { AdditionalInformation } from 'src/app/shared/models/invoice-model';
import { UserModel } from 'src/app/shared/models/user-model';
import { UserDataStoreService } from 'src/app/shared/services/data-store-services/user-data-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

export interface DialogData {
  additionalInformation: AdditionalInformation;
}

@Component({
  selector: 'app-print-invoice-popup',
  templateUrl: './print-invoice-popup.component.html',
  styleUrls: ['./print-invoice-popup.component.scss'],
  providers: [
    KeyboardAlphabetComponentService,
    KeyboardNumericComponentService,
  ],
})
export class PrintInvoicePopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  invoiceForm: FormGroup;
  users: Observable<UserModel[]>;
  currentUser: UserModel;

  public additionalInformation: AdditionalInformation;

  get buyerNameControl(): AbstractControl | null {
    return this.invoiceForm.get('buyerName');
  }

  get advancePaymentControl(): AbstractControl | null {
    return this.invoiceForm.get('advancePayment');
  }

  constructor(
    private dialogRef: MatDialogRef<PrintInvoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef,
    private userDataStoreService: UserDataStoreService,
    private keyboardAlphabetComponentService: KeyboardAlphabetComponentService,
    private keyboardNumericComponentService: KeyboardNumericComponentService,
    private translateService: TranslateService
  ) {
    this.additionalInformation = data.additionalInformation;
  }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      buyerName: new FormControl(this.additionalInformation.buyerName, []),
      advancePayment: new FormControl(
        this.additionalInformation.advancePayment,
        [Validators.max(this.additionalInformation.maxAmount)]
      ),
      user: new FormControl(this.additionalInformation.user, []),
    });
    this.users = this.userDataStoreService.entities;
    this.subs.sink.getCurrentUser =
      this.userDataStoreService.currentUser.subscribe((user) => {
        this.currentUser = user;
        this.invoiceForm.get('user').setValue(user);
      });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  selectCurrentUser(user: UserModel): void {
    this.userDataStoreService.selectUser(user);
  }

  increasePaymentFor(value: number): void {
    const v = this.invoiceForm.get('advancePayment');
    v.value + value > this.additionalInformation.amount
      ? v.setValue(this.additionalInformation.amount)
      : v.setValue(v.value + value);
  }

  public saveSelection(): void {
    this.dialogRef.close(this.invoiceForm.value);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  insertName(): void {
    const buyerField = this.invoiceForm.get('buyerName');
    this.keyboardAlphabetComponentService
      .openDialog(buyerField.value, this.translateService.instant('buyerName'))
      .subscribe((value) => {
        if (value) {
          buyerField.setValue(value);
        }
      });
  }

  insertAdvancePayment(): void {
    const payField = this.invoiceForm.get('advancePayment');
    this.keyboardNumericComponentService
      .openDialog(
        this.translateService.instant('advancePayment'),
        UOM.NUMBER,
        false,
        this.translateService.instant('advancePayment'),
        payField.value
      )
      .subscribe((result) => {
        if (result && result.value) {
          payField.setValue(result.value);
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
