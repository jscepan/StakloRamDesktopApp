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
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { UserModel } from 'src/app/shared/models/user-model';
import { UserDataStoreService } from 'src/app/shared/services/data-store-services/user-data-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

export interface DialogData {
  invoice: InvoiceModel;
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
  invoice: InvoiceModel;

  // public additionalInformation: AdditionalInformation;

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
    this.invoice = data.invoice;
  }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      buyerName: new FormControl(this.invoice.buyerName, []),
      advancePayment: new FormControl(
        isNaN(+this.invoice.advancePayment) ? 0 : +this.invoice.advancePayment,
        [Validators.max(this.invoice.amount)]
      ),
      user: new FormControl(this.invoice.user, []),
    });
    this.users = this.userDataStoreService.entities;
    this.subs.sink.getCurrentUser =
      this.userDataStoreService.currentUser.subscribe((user) => {
        this.currentUser = user;
        this.invoiceForm.get('user').setValue(user);
      });
    if (this.invoice.user && this.invoice.user.isActive) {
      this.selectCurrentUser(this.invoice.user);
    }
    this.invoiceForm.valueChanges.subscribe((form) => {
      this.invoice.buyerName = form.buyerName;
      this.invoice.advancePayment = form.advancePayment;
      this.invoice.user = form.user;
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  selectCurrentUser(user: UserModel): void {
    this.userDataStoreService.selectUser(user);
  }

  increasePaymentFor(value: number): void {
    if (isNaN(+value)) {
      return;
    }
    const v = this.invoiceForm.get('advancePayment');
    +v.value + +value > +this.invoice.amount
      ? v.setValue(+this.invoice.amount)
      : v.setValue(+v.value + value);
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
