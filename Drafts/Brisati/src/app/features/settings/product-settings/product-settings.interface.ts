import { Observable } from 'rxjs';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';

export interface ProductSettings<T> {
  createEmptyEntity(): Observable<Entity[]>;

  mapEntityToFrame(entity: T): Observable<Entity[]>;

  getTableData(entities: T[]): TableShow;
}
