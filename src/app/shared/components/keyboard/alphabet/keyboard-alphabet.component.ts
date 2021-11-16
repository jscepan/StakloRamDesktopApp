import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

export interface DialogData {
  title: string;
  value: number;
}

@Component({
  selector: 'app-keyboard-alphabet',
  templateUrl: './keyboard-alphabet.component.html',
  styleUrls: ['./keyboard-alphabet.component.scss'],
})
export class KeyboardAlphabetComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  buttonFirstRow: {
    key: string;
    displayValue: string;
    displayValueCL: string;
    isSquare: boolean;
  }[] = [
    { key: 'Q', displayValue: 'q', displayValueCL: 'Q', isSquare: true },
    { key: 'W', displayValue: 'w', displayValueCL: 'W', isSquare: true },
  ];

  title: string = '';
  inputFieldTitle: string = '';
  @ViewChild('inputValue') inputValue: ElementRef;
  valueForm: FormGroup;

  capsLockActive: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<KeyboardAlphabetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.title = data?.title || '';
    this.valueForm = new FormGroup({
      value: new FormControl(data?.value ? data.value : '', []),
    });
  }

  get valueControl(): AbstractControl | null {
    return this.valueForm.get('value');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.inputValue.nativeElement.focus();
      this.inputValue.nativeElement.select();
    });
  }

  public saveSelection(): void {
    this.dialogRef.close(this.valueForm.value.value);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  keyClicked(char: string): void {
    const button = this.buttonFirstRow.find((x) => x.key === char);
    this.valueControl.setValue(
      this.valueControl.value +
        (this.capsLockActive ? button.displayValueCL : button.displayValue)
    );
  }

  backspaceClicked(): void {
    if (this.valueControl.value.length > 0) {
      this.valueControl.setValue(this.valueControl.value.slice(0, -1));
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
