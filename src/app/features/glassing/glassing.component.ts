import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-glassing',
  templateUrl: './glassing.component.html',
  styleUrls: ['./glassing.component.scss'],
  providers: [],
})
export class GlassingComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  constructor(private route: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
