import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
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
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { MODE } from '../../me-basic-alert/me-basic-alert.interface';

export interface DialogData {
  title: string;
  uom: string;
  value: number;
  showNextOperationButton: boolean;
  inputFieldTitle: string;
}

@Component({
  selector: 'app-keyboard-numeric',
  templateUrl: './keyboard-numeric.component.html',
  styleUrls: ['./keyboard-numeric.component.scss'],
})
export class KeyboardNumericComponent implements OnInit, AfterViewInit {
  title: string = '';
  uom: string = '';
  showNextOperationButton: boolean = false;
  inputFieldTitle: string = '';
  @ViewChild('inputValue') inputValue: ElementRef;
  valueForm: FormGroup;
  initialLoad: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<KeyboardNumericComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {
    this.title = data.title;
    this.uom = data.uom;
    this.showNextOperationButton = data.showNextOperationButton;
    this.inputFieldTitle = data.inputFieldTitle;
    this.valueForm = new FormGroup({
      value: new FormControl(data.value ? data.value : '0', [
        Validators.min(0),
      ]),
    });
  }

  get valuetControl(): AbstractControl | null {
    return this.valueForm.get('value');
  }

  ngOnInit(): void {
    this.initialLoad = true;
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.inputValue.nativeElement.focus();
      this.inputValue.nativeElement.select();
    });
  }

  public saveSelection(nextOperation: boolean = false): void {
    this.dialogRef.close({
      value: parseFloat(this.valueForm.value.value),
      nextOperation,
    });
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  numberClicked(event: string): void {
    const valueControl = this.valueForm.get('value');
    if (this.initialLoad) {
      valueControl.setValue('0');
      this.initialLoad = false;
    }
    switch (event) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        if (valueControl.value === '0') {
          valueControl.setValue('');
        }
        valueControl.setValue(valueControl.value + event);
        break;
      case '.':
        if (!valueControl.value.includes('.')) {
          valueControl.setValue(valueControl.value + event);
        }
        break;
    }
    this.inputValue.nativeElement.focus();
  }

  backspaceClicked(): void {
    const valueControl = this.valueForm.get('value');
    if (valueControl.value.slice(-1) === '.') {
      valueControl.setValue(valueControl.value.slice(0, -1));
    }
    if (valueControl.value.length > 0) {
      valueControl.setValue(valueControl.value.slice(0, -1));
    }
    if (valueControl.value.length === 0) {
      valueControl.setValue('0');
    }
  }

  checkIsNumber(event): void {
    if (event.key === 'Enter') {
      this.saveSelection(this.showNextOperationButton);
    }
    if (isNaN(+this.valueForm.get('value').value)) {
      this.globalService.showBasicAlert(
        MODE.error,
        this.translateService.instant('inputError'),
        this.translateService.instant('onlyNumbersAreAllowed')
      );
    }
  }
}
