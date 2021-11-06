import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { GlassWidthModel } from 'src/app/shared/models/glass-width-model';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapGlassWidthService implements ProductSettings<GlassWidthModel> {
  constructor(private translateService: TranslateService) {}

  createEmptyEntity() {
    throw new Error('Method not implemented.');
  }

  mapEntityToFrame(entity: GlassWidthModel): Entity[] {
    throw new Error('Method not implemented.');
  }

  getTableData(entities: GlassWidthModel[]): TableShow {
    throw new Error('Method not implemented.');
  }
}
