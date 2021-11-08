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

  routes: string[] = [
    'dashboard',
    'framing',
    'glassing',
    'search',
    'debts',
    'settings',
    'exit',
  ];
  selectedRoute: string = '';

  constructor(private router: Router, private activateRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.sink.$routerEvents = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && val.url) {
        this.routes.forEach((route: string) => {
          if (route.startsWith(val.url.replace('/', ''))) {
            this.selectedRoute = val.url.replace('/', '');
          }
        });
      }
    });
    this.routes.forEach((route: string) => {
      if (route.startsWith(this.router.url.replace('/', ''))) {
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
