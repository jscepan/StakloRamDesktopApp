import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { AppDataService } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
})
export class ProductSettingsComponent implements OnInit {
  table: TableShow;

  constructor(
    private _activeRoute: ActivatedRoute,
    private appDataService: AppDataService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    let productName = this._activeRoute.snapshot.paramMap.get('productName');
    switch (productName) {
      case 'frames':
        this.appDataService.dataFrames.subscribe((entities) => {
          // this.setFramesTable(entities);
          this.setFramesTable([
            {
              oid: 'oid',
              name: 'name',
              uom: UOM.CENTIMETER,
              pricePerUom: 23,
              frameWidthMM: 34,
              cashRegisterNumber: 54,
            },
          ]);
        });
    }
  }

  setFramesTable(entities: FrameModel[]): void {
    this.table = {
      header: [
        this.translateService.instant('code'),
        this.translateService.instant('name'),
        this.translateService.instant('uom'),
        this.translateService.instant('pricePerUom'),
        this.translateService.instant('frameWidthMM'),
        this.translateService.instant('cashRegisterNumber'),
      ],
      data: [],
    };
    entities.forEach((entity) => {
      this.table.data.push(entity.oid);
      this.table.data.push(entity.name);
      this.table.data.push(entity.uom);
      this.table.data.push(entity.pricePerUom + '');
      this.table.data.push(entity.frameWidthMM + '');
      this.table.data.push(entity.cashRegisterNumber + '');
      this.table.data.push(entity.oid);
      this.table.data.push(entity.name);
      this.table.data.push(entity.uom);
      this.table.data.push(entity.pricePerUom + '');
      this.table.data.push(entity.frameWidthMM + '');
      this.table.data.push(entity.cashRegisterNumber + '');
      this.table.data.push(entity.oid);
      this.table.data.push(entity.name);
      this.table.data.push(entity.uom);
      this.table.data.push(entity.pricePerUom + '');
      this.table.data.push(entity.frameWidthMM + '');
      this.table.data.push(entity.cashRegisterNumber + '');
    });
  }
}
