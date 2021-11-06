import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { PasspartuModel } from 'src/app/shared/models/passpartu-model';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapPasspartuService implements ProductSettings<PasspartuModel> {
  constructor(private translateService: TranslateService) {}

  createEmptyEntity() {
    throw new Error('Method not implemented.');
  }

  mapEntityToFrame(entity: PasspartuModel): Entity[] {
    throw new Error('Method not implemented.');
  }

  getTableData(entities: PasspartuModel[]): TableShow {
    throw new Error('Method not implemented.');
  }
}
