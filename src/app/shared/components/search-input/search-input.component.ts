import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { KeyboardAlphabetComponentService } from '../keyboard/alphabet/keyboard-alphabet.component.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [KeyboardAlphabetComponentService],
})
export class SearchInputComponent implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: string = '';
  @Input() debounceTime: number = 100;
  @Input() minCharacters: number = 1;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter();

  searchInput: FormControl = new FormControl();

  private inputChangeSubscription!: Subscription;

  constructor(
    private keyboardAlphabetComponentService: KeyboardAlphabetComponentService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.inputChangeSubscription = this.searchInput.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe(() => {
        if (this.searchInput.value.length === 0) {
          this.changeEvent.emit(this.searchInput.value);
        } else if (this.searchInput.value.length >= this.minCharacters) {
          this.changeEvent.emit(this.searchInput.value);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.keyword && changes.keyword.previousValue) {
      if (changes.keyword.currentValue !== changes.keyword.previousValue) {
        // if the change is comming from outside we are not emiting, just setting the value
        this.searchInput.setValue(this.keyword, { emitEvent: false });
      }
    }
  }

  insertText(): void {
    this.keyboardAlphabetComponentService
      .openDialog(
        this.searchInput.value,
        this.translateService.instant('searchFor')
      )
      .subscribe((value) => {
        if (value) {
          this.searchInput.setValue(value);
        }
      });
  }

  resetSearchInputValue(): void {
    this.searchInput.setValue('');
  }

  ngOnDestroy(): void {
    this.inputChangeSubscription.unsubscribe();
  }
}
