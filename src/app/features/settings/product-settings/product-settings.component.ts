import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEditComponentService } from '@features/settings/product-settings/create-edit-popup/create-edit-component.service';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { BaseModel } from 'src/app/shared/models/base-model';
import { BaseDataStoreService } from 'src/app/shared/services/data-store-services/base-data-store.service';
import { FacetingDataStoreService } from 'src/app/shared/services/data-store-services/faceting-data-store.service';
import { FrameDataStoreService } from 'src/app/shared/services/data-store-services/frame-data-store.service';
import { GlassDataStoreService } from 'src/app/shared/services/data-store-services/glass-data-store.service';
import { MirrorDataStoreService } from 'src/app/shared/services/data-store-services/mirror-data-store.service';
import { PasspartuColorDataStoreService } from 'src/app/shared/services/data-store-services/passpartu-color-data-store.service';
import { PasspartuDataStoreService } from 'src/app/shared/services/data-store-services/passpartu-data-store.service';
import { SandingDataStoreService } from 'src/app/shared/services/data-store-services/sanding-data-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { MapFrameService } from './map-services/map-frame.service';
import { MapPasspartuColorService } from './map-services/map-passpartu-color.service';
import { MapProductService } from './map-services/map-product.service';
import { ProductSettings } from './product-settings.interface';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
  providers: [
    CreateEditComponentService,
    MapFrameService,
    MapPasspartuColorService,
    MapProductService,
  ],
})
export class ProductSettingsComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  table: TableShow;
  entities: any[] = [];
  productName: string = '';
  mapService: ProductSettings<BaseModel>;
  webService: BaseDataStoreService<BaseModel>;
  productNameForAlert: string;

  constructor(
    private _activeRoute: ActivatedRoute,
    private route: Router,
    private createEditComponentService: CreateEditComponentService,
    private globalService: GlobalService,
    private translateService: TranslateService,

    private mapFrameService: MapFrameService,
    private mapProductService: MapProductService,
    private mapPasspartuColorService: MapPasspartuColorService,

    private frameDataService: FrameDataStoreService,
    private glassDataService: GlassDataStoreService,
    private passpartuDataService: PasspartuDataStoreService,
    private passpartuColorDataService: PasspartuColorDataStoreService,
    private facetingDataService: FacetingDataStoreService,
    private mirrorDataService: MirrorDataStoreService,
    private sandingDataService: SandingDataStoreService
  ) {}

  ngOnInit(): void {
    this.productName = this._activeRoute.snapshot.paramMap.get('productName');
    switch (this.productName) {
      case 'frames':
        this.mapService = this.mapFrameService;
        this.webService = this.frameDataService;
        this.productNameForAlert = this.translateService.instant('frame');
        break;
      case 'glass':
        this.mapService = this.mapProductService;
        this.webService = this.glassDataService;
        this.productNameForAlert = this.translateService.instant('glass');
        break;
      case 'passpartu':
        this.mapService = this.mapProductService;
        this.webService = this.passpartuDataService;
        this.productNameForAlert = this.translateService.instant('passpartu');
        break;
      case 'passpartuColor':
        this.mapService = this.mapPasspartuColorService;
        this.webService = this.passpartuColorDataService;
        this.productNameForAlert =
          this.translateService.instant('passpartuColor');
        break;
      case 'mirror':
        this.mapService = this.mapProductService;
        this.webService = this.mirrorDataService;
        this.productNameForAlert = this.translateService.instant('mirror');
        break;
      case 'faceting':
        this.mapService = this.mapProductService;
        this.webService = this.facetingDataService;
        this.productNameForAlert = this.translateService.instant('faceting');
        break;
      case 'sanding':
        this.mapService = this.mapProductService;
        this.webService = this.sandingDataService;
        this.productNameForAlert = this.translateService.instant('sanding');
        break;
    }
    this.subs.sink.productSetings = this.webService.entities.subscribe(
      (entities) => {
        this.entities = entities;
        this.table = this.mapService.getTableData(entities);
      }
    );
  }

  cancel(): void {
    this.route.navigate(['settings']);
  }

  createNewData(): void {
    this.createEditComponentService
      .openDialog(this.mapService.createEmptyEntity())
      .subscribe((data) => {
        if (data) {
          this.subs.sink.createNewData = this.webService
            .createNewEntity(data)
            .subscribe(() => {
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

  clickEditData(oid: string): void {
    // TODO
    let entity = this.entities.find((e) => e.oid === oid);
    this.subs.sink.editData = this.createEditComponentService
      .openDialog(this.mapService.mapEntityToFrame(entity), true)
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
