import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseModel } from '../models/base-model';

@Injectable()
export class BaseDataService<T extends BaseModel> {
  private $entities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public readonly entities: Observable<T[]> = this.$entities.asObservable();

  constructor() {}

  public createNewEntity(entity: T): Observable<void> {
    return new Observable((subscriber) => {
      // TODO zapamti izmenu u bazi i dodeli oid
      let x = this.$entities.getValue();
      entity.oid = 'neki novi oid';
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
