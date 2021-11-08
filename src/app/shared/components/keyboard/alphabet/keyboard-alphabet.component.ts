import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-keyboard-alphabet',
  templateUrl: './keyboard-alphabet.component.html',
  styleUrls: ['./keyboard-alphabet.component.scss'],
})
export class KeyboardAlphabetComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  constructor() {}

  ngOnInit(): void {}

  click(character: string): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
