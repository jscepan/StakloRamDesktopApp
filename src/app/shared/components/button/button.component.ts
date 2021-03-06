import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

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
  private subs = new SubscriptionManager();

  @Input() text: string = '';
  @Input() iconName?: string;
  @Input() iconPosition?: 'left' | 'right' = 'left';
  @Input() buttonSize: 'big' | 'middle' | 'small' = 'big';
  @Input() fontSize: number = 16;

  @Input() isSquare: boolean = false;

  @Input() disabled: boolean = false;
  @Input() isTransparentMode: boolean = false; // this is not the same as disabled, this is 1 of 2 styling theme modes
  @Input() fullWidth: boolean = false; // Case when button have to take full width of me-button container
  @Input() fullHeight: boolean = false; // Case when button have to take full height of me-button container
  @Input() color: PalleteOptions = 'primary';

  @Output() clickEvent: EventEmitter<Event> = new EventEmitter();

  constructor(private constantsService: AppSettingsService) {}

  ngOnInit(): void {
    // let fontSize: boolean = true;
    // let buttonSize: boolean = true;
    // if (this.fontSize) {
    //   fontSize = false;
    // }
    // if (this.buttonSize) {
    //   buttonSize = false;
    // }
    // if (fontSize || buttonSize) {
    //   if (fontSize) {
    //     this.subs.sink.fontSize = this.constantsService.settings.subscribe(
    //       (settings) => {
    //         this.fontSize = settings.applicationDesign.fontSize;
    //       }
    //     );
    //   }
    //   if (buttonSize) {
    //     this.subs.sink.buttonSize = this.constantsService.settings.subscribe(
    //       (settings) => {
    //         this.buttonSize = settings.applicationDesign.buttonSize;
    //       }
    //     );
    //   }
    // }
  }

  onClick(e: Event): void {
    e.preventDefault();
    this.clickEvent.emit(e);
  }
}
