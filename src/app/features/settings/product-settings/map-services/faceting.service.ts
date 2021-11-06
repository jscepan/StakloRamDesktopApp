import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { FacetingModel } from 'src/app/shared/models/faceting-model';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapFacetingService implements ProductSettings<FacetingModel> {
  constructor(private translateService: TranslateService) {}

  createEmptyEntity() {
    throw new Error('Method not implemented.');
  }

  mapEntityToFrame(entity: FacetingModel): Entity[] {
    throw new Error('Method not implemented.');
  }

  getTableData(entities: FacetingModel[]): TableShow {
    throw new Error('Method not implemented.');
  }
}
