import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';

export interface ProductSettings<T> {
  createEmptyEntity();

  mapEntityToFrame(entity: T): Entity[];

  getTableData(entities: T[]): TableShow;
}
