import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import {
  AppSettingsService,
  AppSettings,
} from 'src/app/shared/services/app-settings.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  items: Entity[] = [];
  settings: AppSettings;

  constructor(
    private appSettingsService: AppSettingsService,
    private route: Router,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // this.subs.sink.settings = this.appSettingsService.settings.subscribe(
    //   (settings) => {
    //     this.settings = settings;
    //     this.mapFormData(settings);
    //   }
    // );
  }

  cancel(): void {
    this.route.navigate(['settings']);
  }
  createNewData(): void {
    // this.subs.sink = this.mapService
    //   .createEmptyEntity()
    //   .subscribe((entities) => {
    //     this.createEditComponentService
    //       .openDialog(entities)
    //       .subscribe((data) => {
    //         if (data) {
    //           this.subs.sink.createNewData = this.webService
    //             .createNewEntity(data)
    //             .subscribe(() => {
    //               this.globalService.showBasicAlert(
    //                 MODE.success,
    //                 this.translateService.instant('success'),
    //                 this.productNameForAlert +
    //                   ' ' +
    //                   this.translateService.instant('successfullyCreated')
    //               );
    //             });
    //         }
    //       });
    //   });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
