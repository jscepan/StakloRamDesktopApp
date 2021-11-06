import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEditComponentService } from '@features/settings/product-settings/create-edit-popup/create-edit-component.service';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
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
    private route: Router,
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

  cancel(): void {
    this.route.navigate(['settings']);
  }

  createNewData(): void {
    let xxx: Entity[] = [
      {
        oid: 'df3784',
        label: { key: 'code', value: 'Code' },
        type: 'string',
        value: '',
        disabled: true,
      },
      {
        oid: 'df734',
        label: { key: 'name', value: 'Name' },
        type: 'string',
        value: 'entity.name',
        required: true,
      },
      {
        oid: 'df87',
        label: { key: 'uom', value: 'UOM' },
        type: 'select',
        value: 'entity.uom',
        optionalValues: [
          { key: 'cm', value: 'cm' },
          { key: 'mm', value: 'mm' },
        ],
        required: true,
      },
      {
        oid: 'df231',
        label: { key: 'ppUOM', value: 'PP uom' },
        type: 'number',
        value: 'entity.pricePerUom',
        required: true,
      },
      {
        oid: 'df34',
        label: { key: 'fwMM', value: 'FW mm' },
        type: 'number',
        value: 'entity.frameWidthMM',
        required: true,
      },
      {
        oid: 'df56',
        label: { key: 'crNum', value: 'CR num' },
        type: 'number',
        value: 'entity.cashRegisterNumber',
        required: true,
      },
    ];
    this.createEditComponentService.openDialog(xxx).subscribe((data) => {
      console.log(data);
    });
  }

  clickEditData(oid: string): void {
    // TODO
    let entity = this.entities.find((e) => e.oid === oid);
    let xxx: Entity[] = [
      {
        oid: 'df3784',
        label: { key: 'code', value: 'Code' },
        type: 'string',
        value: entity.oid,
        disabled: true,
      },
      {
        oid: 'df734',
        label: { key: 'name', value: 'Name' },
        type: 'string',
        value: entity.name,
        required: true,
      },
      {
        oid: 'df87',
        label: { key: 'uom', value: 'UOM' },
        type: 'select',
        value: entity.uom,
        optionalValues: [
          { key: 'cm', value: 'cm' },
          { key: 'mm', value: 'mm' },
        ],
        required: true,
      },
      {
        oid: 'df231',
        label: { key: 'ppUOM', value: 'PP uom' },
        type: 'number',
        value: entity.pricePerUom,
        required: true,
      },
      {
        oid: 'df34',
        label: { key: 'fwMM', value: 'FW mm' },
        type: 'number',
        value: entity.frameWidthMM,
        required: true,
      },
      {
        oid: 'df56',
        label: { key: 'crNum', value: 'CR num' },
        type: 'number',
        value: entity.cashRegisterNumber,
        required: true,
      },
    ];
    this.createEditComponentService.openDialog(xxx).subscribe((data) => {
      console.log('data');
      console.log(data);

      // let frame = { oid };

      // data.

      // this.appDataService.editFrame({
      //   oid,
      //   name: data.name,
      //   uom: data.uom,
      //   pricePerUom: data.pricePerUom,
      //   frameWidthMM: data.frameWidthMM,
      //   cashRegisterNumber: data.cashRegisterNumber,
      // });
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
