import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MeSweetAlertI } from './me-sweet-alert.interface';

@Component({
  selector: 'me-sweet-alert',
  templateUrl: './me-sweet-alert.component.html',
  styleUrls: ['./me-sweet-alert.component.scss'],
})
export class MeSweetAlertComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sweetAlertForm') sweetForm!: NgForm;
  @Output() eventOccurs: EventEmitter<{
    eventName: string;
    payload: MeSweetAlertI;
  }> = new EventEmitter();

  submitButtonDisabled: boolean = false;

  private _statusSubscritpion!: Subscription;

  enabledCheckbox: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MeSweetAlertI) {}

  toLowerCase = (str?: string) => {
    return str?.toLowerCase();
  };

  ngAfterViewInit(): void {}

  customEvent(eventName: string, payload: MeSweetAlertI): void {
    this.eventOccurs.emit({ eventName, payload });
  }

  ngOnDestroy(): void {
    if (this._statusSubscritpion) {
      this._statusSubscritpion.unsubscribe();
    }
  }
}
