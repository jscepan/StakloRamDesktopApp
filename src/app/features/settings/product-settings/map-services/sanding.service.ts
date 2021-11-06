import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { SandingModel } from 'src/app/shared/models/sanding-model';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapSandingService implements ProductSettings<SandingModel> {
  constructor(private translateService: TranslateService) {}

  createEmptyEntity() {
    throw new Error('Method not implemented.');
  }

  mapEntityToFrame(entity: SandingModel): Entity[] {
    throw new Error('Method not implemented.');
  }

  getTableData(entities: SandingModel[]): TableShow {
    throw new Error('Method not implemented.');
  }
}
