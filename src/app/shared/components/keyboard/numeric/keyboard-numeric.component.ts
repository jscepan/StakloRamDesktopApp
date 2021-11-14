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
  value: number = 0;
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
    let v = this.value + '';
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
        if (this.value.toString() === '0') {
          v = '';
        }
        v += event;
        break;
      case '0':
        if (v !== '0') v += event;
        break;
      case '.':
        if (!v.includes('.')) v += event;
        break;
    }
    this.value = parseFloat(v);
  }
}
