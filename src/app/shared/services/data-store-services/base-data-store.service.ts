import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseModel } from '../../models/base-model';
import { BaseWebService } from '../web-services/base-web.service';

@Injectable()
export class BaseDataStoreService<T extends BaseModel> {
  private $entities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public readonly entities: Observable<T[]> = this.$entities.asObservable();

  constructor(
    public baseWebService: BaseWebService,
    @Inject('') public domainName: string = ''
  ) {
    console.log('KRENI U KONSTRUKTOR ZA ' + this.domainName);
    this.baseWebService
      .getRequestForArray<T>(this.domainName)
      .subscribe((entities) => {
        this.$entities.next(entities);
      });
  }

  public createNewEntity(entity: T): Observable<void> {
    return new Observable((subscriber) => {
      // TODO zapamti izmenu u bazi i dodeli oid
      this.baseWebService.postRequest(this.domainName, entity).subscribe(() => {
        let e = this.$entities.getValue();
        e.push(entity);
        this.$entities.next(e);
        subscriber.next();
        subscriber.complete();
      });
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
