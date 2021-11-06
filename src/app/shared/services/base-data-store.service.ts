import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseModel } from '../models/base-model';

@Injectable()
export class BaseDataStoreService<T extends BaseModel> {
  private $entities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public readonly entities: Observable<T[]> = this.$entities.asObservable();

  // flag that indicates if we have received data from web service
  private readonly _dataLoaded = new BehaviorSubject<boolean>(false);
  readonly dataLoaded$ = this._dataLoaded.asObservable();

  // data loaded methods
  get dataLoaded(): boolean {
    return this._dataLoaded.getValue();
  }

  set dataLoaded(dataLoaded: boolean) {
    this._dataLoaded.next(dataLoaded);
  }

  constructor() {}

  public createNewEntity(entity: T): Observable<void> {
    return new Observable((subscriber) => {
      // TODO zapamti izmenu u bazi i dodeli oid
      let x = this.$entities.getValue();
      if (!entity.oid) {
        entity.oid = 'neki novi oid';
      }
      console.log('UBACEN');
      x.push(entity);
      this.$entities.next(x);
      subscriber.next();
      subscriber.complete();
    });
  }

  public editEntity(entity: T): Observable<void> {
    return new Observable((subscriber) => {
      // TODO zapamti izmenu u bazi
      let entities = this.$entities.getValue().map((frame: T) => {
        return entity.oid === frame.oid ? entity : frame;
      });
      this.$entities.next(entities);
      subscriber.next();
      subscriber.complete();
    });
  }
}
