import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  uom: string;
  value: string;
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
  value: string = '0';
  showNextOperationButton: boolean = false;
  inputFieldTitle: string = '';

  constructor(
    private dialogRef: MatDialogRef<KeyboardNumericComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef
  ) {
    this.title = data.title;
    this.uom = data.uom;
    this.value = data.value;
    this.showNextOperationButton = data.showNextOperationButton;
    this.inputFieldTitle = data.inputFieldTitle;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public saveSelection(): void {
    this.dialogRef.close(this.value);
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  numberClicked(event: string): void {
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
        if (this.value === '0') {
          this.value = '';
        }
        this.value += event;
        break;
      case '0':
        if (this.value !== '0') this.value += event;
        break;
      case '.':
        if (!this.value.includes('.')) this.value += event;
        break;
    }
  }
}
