import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
