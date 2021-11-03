import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private constantsService: ConstantsService
  ) {}

  ngOnInit(): void {}

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
