import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  providers: [],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  constructor(private route: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.route.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
