import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { ProductSettings } from '../product-settings.interface';
import { MapProductService } from './map-product.service';

@Injectable()
// implements ProductSettings<FrameModel>
export class MapFrameService extends MapProductService {
  createEmptyEntity(): Entity[] {
    const e = super.createEmptyEntity();
    e.push({
      label: {
        key: 'frameWidthMM',
        value: this.translateService.instant('fwMM'),
      },
      type: 'number',
      value: 0,
      required: true,
    });
    return e;
  }

  mapEntityToFrame(entity: FrameModel): Entity[] {
    const e = super.mapEntityToFrame(entity);
    e.push({
      label: {
        key: 'frameWidthMM',
        value: this.translateService.instant('frameWidthMM'),
      },
      type: 'number',
      value: entity.frameWidthMM,
      required: true,
    });
    return e;
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
