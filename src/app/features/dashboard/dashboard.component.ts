import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imageUrl?: string = '/assets/types-of-glass-used-in-construction-629x420.jpg';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(url: string): void {
    if (url === 'exit') {
      // TODO izadji iz programa
    }
    this.router.navigate([url]);
  }
}
