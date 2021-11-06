import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { PasspartuColorModel } from 'src/app/shared/models/passpartu-color-model';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapPasspartuColorService
  implements ProductSettings<PasspartuColorModel>
{
  constructor(private translateService: TranslateService) {}

  createEmptyEntity() {
    return [
      {
        label: { key: 'name', value: this.translateService.instant('name') },
        type: 'string',
        value: '',
        required: true,
      },
    ];
  }

  mapEntityToFrame(entity: PasspartuColorModel): Entity[] {
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
    ];
  }

  getTableData(entities: PasspartuColorModel[]): TableShow {
    let table = {
      header: [
        this.translateService.instant('code'),
        this.translateService.instant('name'),
      ],
      data: [],
    };
    entities.forEach((entity) => {
      table.data.push(entity.oid);
      table.data.push(entity.name);
    });
    return table;
  }
}
