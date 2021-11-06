import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseModel } from '../../models/base-model';
import { BaseWebService } from '../base-web.service';

@Injectable()
export class BaseDataStoreService<T extends BaseModel> {
  private $entities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public readonly entities: Observable<T[]> = this.$entities.asObservable();

  constructor(
    public baseWebService: BaseWebService,
    @Inject('') public domainName: string = ''
  ) {}

  public createNewEntity(entity: T): Observable<void> {
    return new Observable((subscriber) => {
      // TODO zapamti izmenu u bazi i dodeli oid
      // this.baseWebService.postRequest(this.domainName, entity).subscribe(() => {
      let x = this.$entities.getValue();
      if (!entity.oid) {
        entity.oid = 'oid' + Math.floor(Math.random() * 1000);
      }
      x.push(entity);
      this.$entities.next(x);
      subscriber.next();
      subscriber.complete();
      // });
    });
  }

  public editEntity(entity: T): Observable<void> {
    return new Observable((subscriber) => {
      this.baseWebService.putRequest(this.domainName, entity).subscribe(() => {
        let entities = this.$entities.getValue().map((frame: T) => {
          return entity.oid === frame.oid ? entity : frame;
        });
        this.$entities.next(entities);
        subscriber.next();
        subscriber.complete();
      });
    });
  }
}
