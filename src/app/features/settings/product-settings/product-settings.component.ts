import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEditComponentService } from '@features/settings/product-settings/create-edit-popup/create-edit-component.service';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { BaseModel } from 'src/app/shared/models/base-model';
import { BaseDataService } from 'src/app/shared/services/base-data.service';
import { FacetingDataService } from 'src/app/shared/services/data-services/faceting-data.service';
import { FrameDataService } from 'src/app/shared/services/data-services/frame-data.service';
import { GlassDataService } from 'src/app/shared/services/data-services/glass-data.service';
import { GlassWidthDataService } from 'src/app/shared/services/data-services/glass-width-data.service';
import { PasspartuColorDataService } from 'src/app/shared/services/data-services/passpartu-color-data.service';
import { PasspartuDataService } from 'src/app/shared/services/data-services/passpartu-data.service';
import { SandingDataService } from 'src/app/shared/services/data-services/sanding-data.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { MapFacetingService } from './map-services/faceting.service';
import { MapFrameService } from './map-services/map-frame.service';
import { MapGlassWidthService } from './map-services/map-glass-width.service';
import { MapGlassService } from './map-services/map-glass.service';
import { MapPasspartuColorService } from './map-services/map-passpartu-color.service';
import { MapPasspartuService } from './map-services/map-passpartu.service';
import { MapSandingService } from './map-services/sanding.service';
import { ProductSettings } from './product-settings.interface';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
  providers: [
    CreateEditComponentService,
    MapFrameService,
    MapPasspartuService,
    MapPasspartuColorService,
    MapGlassWidthService,
    MapFacetingService,
    MapGlassService,
    MapSandingService,
  ],
})
export class ProductSettingsComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  table: TableShow;
  entities: any[] = [];
  productName: string = '';
  mapService: ProductSettings<BaseModel>;
  webService: BaseDataService<BaseModel>;
  productNameForAlert: string;

  constructor(
    private _activeRoute: ActivatedRoute,
    private route: Router,
    private createEditComponentService: CreateEditComponentService,
    private globalService: GlobalService,
    private translateService: TranslateService,

    private frameDataService: FrameDataService,
    private mapFrameService: MapFrameService,

    private glassDataService: GlassDataService,
    private mapGlassService: MapGlassService,

    private passpartuDataService: PasspartuDataService,
    private mapPasspartuService: MapPasspartuService,

    private passpartuColorDataService: PasspartuColorDataService,
    private mapPasspartuColorService: MapPasspartuColorService,

    private glassWidthDataService: GlassWidthDataService,
    private mapGlassWidthService: MapGlassWidthService,

    private facetingDataService: FacetingDataService,
    private mapFacetingService: MapFacetingService,

    private sandingDataService: SandingDataService,
    private mapSandingService: MapSandingService
  ) {}

  ngOnInit(): void {
    this.productName = this._activeRoute.snapshot.paramMap.get('productName');
    switch (this.productName) {
      case 'frames':
        this.mapService = this.mapFrameService;
        this.webService = this.frameDataService;
        this.productNameForAlert = this.translateService.instant('frame');
      case 'glass':
        this.mapService = this.mapGlassService;
        this.webService = this.glassDataService;
        this.productNameForAlert = this.translateService.instant('glass');
      case 'passpartu':
        this.mapService = this.mapPasspartuService;
        this.webService = this.passpartuDataService;
        this.productNameForAlert = this.translateService.instant('passpartu');
      case 'passpartuColor':
        this.mapService = this.mapPasspartuColorService;
        this.webService = this.passpartuColorDataService;
        this.productNameForAlert =
          this.translateService.instant('passpartuColor');
      case 'glassWidth':
        this.mapService = this.mapGlassWidthService;
        this.webService = this.glassWidthDataService;
        this.productNameForAlert = this.translateService.instant('glassWidth');
      case 'faceting':
        this.mapService = this.mapFacetingService;
        this.webService = this.facetingDataService;
        this.productNameForAlert = this.translateService.instant('faceting');
      case 'sanding':
        this.mapService = this.mapSandingService;
        this.webService = this.sandingDataService;
        this.productNameForAlert = this.translateService.instant('sanding');
    }
    this.subs.sink = this.webService.entities.subscribe((entities) => {
      this.entities = entities;
      this.table = this.mapService.getTableData(entities);
    });
  }

  cancel(): void {
    this.route.navigate(['settings']);
  }

  createNewData(): void {
    switch (this.productName) {
      case 'frames':
        this.createEditComponentService
          .openDialog(this.mapService.createEmptyEntity())
          .subscribe((data) => {
            if (data) {
              this.webService.createNewEntity(data).subscribe(() => {
                this.globalService.showBasicAlert(
                  MODE.success,
                  this.translateService.instant('success'),
                  this.productNameForAlert +
                    ' ' +
                    this.translateService.instant('successfullyCreated')
                );
              });
            }
          });
    }
  }

  clickEditData(oid: string): void {
    // TODO
    let entity = this.entities.find((e) => e.oid === oid);
    this.createEditComponentService
      .openDialog(this.mapService.mapEntityToFrame(entity))
      .subscribe((data) => {
        if (data) {
          data.oid = oid;
          this.webService.editEntity(data).subscribe(() => {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('success'),
              this.productNameForAlert +
                ' ' +
                this.translateService.instant('successfullyEdited')
            );
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
