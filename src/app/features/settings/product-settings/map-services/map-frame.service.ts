import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapFrameService implements ProductSettings<FrameModel> {
  constructor(private translateService: TranslateService) {}

  createEmptyEntity(): Entity[] {
    return [
      {
        label: { key: 'name', value: this.translateService.instant('name') },
        type: 'string',
        value: '',
        required: true,
      },
      {
        label: { key: 'uom', value: this.translateService.instant('uom') },
        type: 'select',
        value: 'cm',
        optionalValues: [
          { key: 'cm', value: 'cm' },
          { key: 'mm', value: 'mm' },
        ],
        required: true,
      },
      {
        label: {
          key: 'pricePerUom',
          value: this.translateService.instant('ppUOM'),
        },
        type: 'number',
        value: 0,
        required: true,
      },
      {
        label: {
          key: 'frameWidthMM',
          value: this.translateService.instant('fwMM'),
        },
        type: 'number',
        value: 0,
        required: true,
      },
      {
        label: {
          key: 'cashRegisterNumber',
          value: this.translateService.instant('crNum'),
        },
        type: 'number',
        value: 0,
        required: true,
      },
    ];
  }

  mapEntityToFrame(entity: FrameModel): Entity[] {
    return [
      {
        label: { key: 'code', value: this.translateService.instant('code') },
        type: 'string',
        value: entity.oid,
        disabled: true,
      },
      {
        label: { key: 'name', value: this.translateService.instant('name') },
        type: 'string',
        value: entity.name,
        required: true,
      },
      {
        label: { key: 'uom', value: this.translateService.instant('UOM') },
        type: 'select',
        value: entity.uom,
        optionalValues: [
          { key: 'cm', value: this.translateService.instant('cm') },
          { key: 'mm', value: this.translateService.instant('mm') },
        ],
        required: true,
      },
      {
        label: {
          key: 'pricePerUom',
          value: this.translateService.instant('pricePerUom'),
        },
        type: 'number',
        value: entity.pricePerUom,
        required: true,
      },
      {
        label: {
          key: 'frameWidthMM',
          value: this.translateService.instant('frameWidthMM'),
        },
        type: 'number',
        value: entity.frameWidthMM,
        required: true,
      },
      {
        label: {
          key: 'cashRegisterNumber',
          value: this.translateService.instant('cashRegisterNumber'),
        },
        type: 'number',
        value: entity.cashRegisterNumber,
        required: true,
      },
    ];
  }

  getTableData(entities: FrameModel[]): TableShow {
    let table = {
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
      table.data.push(entity.oid);
      table.data.push(entity.name);
      table.data.push(entity.uom);
      table.data.push(entity.pricePerUom);
      table.data.push(entity.frameWidthMM);
      table.data.push(entity.cashRegisterNumber);
    });
    return table;
  }
}
