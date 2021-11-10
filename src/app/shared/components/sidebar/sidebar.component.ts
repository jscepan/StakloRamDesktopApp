import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SubscriptionManager } from '../../services/subscription.manager';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  routes: { url: string; displayValue: string }[] = [
    { url: 'dashboard', displayValue: 'dashboard' },
    { url: 'invoice-create-edit/framing', displayValue: 'framing' },
    { url: 'invoice-create-edit/glassing', displayValue: 'glassing' },
    { url: 'invoice-create-edit', displayValue: 'invoiceCreate' },
    { url: 'invoices', displayValue: 'inProgress' },
    { url: 'search', displayValue: 'search' },
    { url: 'debts', displayValue: 'debts' },
    { url: 'settings', displayValue: 'settings' },
    { url: 'exit', displayValue: 'exit' },
  ];
  selectedRoute: string = '';

  constructor(private router: Router, private activateRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.sink.$routerEvents = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && val.url) {
        this.routes.forEach((route: { url: string; displayValue: string }) => {
          if (route.url.startsWith(val.url.replace('/', ''))) {
            this.selectedRoute = val.url.replace('/', '');
          }
        });
      }
    });
    this.routes.forEach((route: { url: string; displayValue: string }) => {
      if (route.url.startsWith(this.router.url.replace('/', ''))) {
        this.selectedRoute = this.router.url.replace('/', '');
      }
    });
  }

  setSelectedRoute(url: string): void {}

  navigateTo(url: string): void {
    if (url === 'exit') {
      // TODO izadji iz programa
    }
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
