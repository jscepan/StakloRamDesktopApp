import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import {
  MeBasicAlertEventsTypes,
  MeBasicAlertI,
} from './me-basic-alert.interface';

@Component({
  selector: 'me-basic-alert',
  templateUrl: './me-basic-alert.component.html',
  styleUrls: ['./me-basic-alert.component.scss'],
})
export class MeBasicAlertComponent implements OnDestroy {
  @Output() eventOccurs: EventEmitter<{ eventName: string }> =
    new EventEmitter();

  readonly EVENT_TYPES = MeBasicAlertEventsTypes;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: MeBasicAlertI) {}

  customEvent(eventName: string): void {
    this.eventOccurs.emit({ eventName });
  }

  ngOnDestroy(): void {}
}
