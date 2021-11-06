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
    throw new Error('Method not implemented.');
  }

  mapEntityToFrame(entity: PasspartuColorModel): Entity[] {
    throw new Error('Method not implemented.');
  }

  getTableData(entities: PasspartuColorModel[]): TableShow {
    throw new Error('Method not implemented.');
  }
}
