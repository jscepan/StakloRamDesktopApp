import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { GlassModel } from 'src/app/shared/models/glass-model';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapGlassService implements ProductSettings<GlassModel> {
  constructor(private translateService: TranslateService) {}

  createEmptyEntity() {
    throw new Error('Method not implemented.');
  }

  mapEntityToFrame(entity: GlassModel): Entity[] {
    throw new Error('Method not implemented.');
  }

  getTableData(entities: GlassModel[]): TableShow {
    throw new Error('Method not implemented.');
  }
}
