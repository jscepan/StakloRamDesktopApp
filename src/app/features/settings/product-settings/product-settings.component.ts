import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateEditComponentService } from '@features/create-edit-popup/create-edit-component.service';
import { Entity } from '@features/create-edit-popup/create-edit-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { AppDataService } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
  providers: [CreateEditComponentService],
})
export class ProductSettingsComponent implements OnInit {
  table: TableShow;
  entities: any[] = [];

  constructor(
    private _activeRoute: ActivatedRoute,
    private appDataService: AppDataService,
    private translateService: TranslateService,
    private createEditComponentService: CreateEditComponentService
  ) {}

  ngOnInit(): void {
    let productName = this._activeRoute.snapshot.paramMap.get('productName');
    switch (productName) {
      case 'frames':
        this.appDataService.dataFrames.subscribe((entities) => {
          this.entities = entities;
          this.setFramesTable(entities);
        });
    }
  }

  clickEditData(oid: string): void {
    // TODO
    let entity = this.entities.find((e) => e.oid === oid);
    console.log(entity);
    let xxx: Entity[] = [
      { label: 'Code', type: 'string', value: entity.oid, disabled: true },
      { label: 'Name', type: 'string', value: entity.name },
      {
        label: 'UOM',
        type: 'select',
        value: entity.uom,
        optionalValues: [
          { key: 'cm', value: 'cm' },
          { key: 'mm', value: 'mm' },
        ],
      },
      { label: 'PP uom', type: 'number', value: entity.pricePerUom },
      { label: 'FW mm', type: 'number', value: entity.frameWidthMM },
      { label: 'CR num', type: 'number', value: entity.cashRegisterNumber },
    ];
    this.createEditComponentService.openDialog(xxx).subscribe((newEntity) => {
      console.log(newEntity);
      // this.appDataService.editFrame({ ...newEntity });
    });
  }

  private setFramesTable(entities: FrameModel[]): void {
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
    });
  }
}
