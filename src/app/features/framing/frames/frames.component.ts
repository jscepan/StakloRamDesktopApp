import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss'],
})
export class FramesComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
