import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

type PalleteOptions =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'danger'
  | 'warning'
  | 'link'
  | 'context-menu'
  | 'link-red'
  | 'link-white';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  componentVersion: string = '0.0.1';

  @Input() text: string = '';
  @Input() iconName?: string;
  @Input() iconPosition?: 'left' | 'right' = 'left';

  @Input() disabled: boolean = false;
  @Input() isTransparentMode: boolean = false; // this is not the same as disabled, this is 1 of 2 styling theme modes
  @Input() fullWidth: boolean = false; // Case when button have to take full width of me-button container
  @Input() fullHeight: boolean = false; // Case when button have to take full height of me-button container
  @Input() color: PalleteOptions = 'primary';

  @Output() clickEvent: EventEmitter<Event> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(e: Event): void {
    e.preventDefault();
    this.clickEvent.emit(e);
  }
}
