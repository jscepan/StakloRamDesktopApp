import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import { Constants } from 'src/app/shared/constants';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imageUrl?: string = 'assets/types-of-glass-used-in-construction-629x420.jpg';

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  navigateTo(url: string): void {
    if (url === 'exit') {
      // TODO izadji iz programa
      window.close();
    } else {
      this.router.navigate([url]);
    }
  }

  scanBarcode(value: any): void {
    console.log('Dosla je vrednost sa citaca: ');
    console.log(value);
    // TODO get scan string from value
    let code = '';
    if (code && code.startsWith(Constants.BARCODE_PREFIX)) {
      code = code.replace(Constants.BARCODE_PREFIX, '');
      if (code.length > 9) {
        this.router.navigate(['invoice-create-edit', 'edit', code]);
        return;
      }
    }
    this.globalService.showBasicAlert(
      MODE.error,
      this.translateService.instant('readingError'),
      this.translateService.instant('thereIsSomeErrorInCodeReading')
    );
  }
}
