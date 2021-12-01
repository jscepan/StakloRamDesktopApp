import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user-model';
import { BaseWebService } from '../web-services/base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable({ providedIn: 'root' })
export class UserDataStoreService extends BaseDataStoreService<UserModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'users');
  }

  public deleteEntity(entity: UserModel): Observable<void> {
    entity = { ...entity, isActive: false };
    return new Observable((subscriber) => {
      this.baseWebService
        .putRequest(this.domainName + '/' + entity.oid, entity)
        .subscribe(() => {
          let entities = this.getEntities()
            .getValue()
            .filter((user: UserModel) => {
              return entity.oid !== user.oid;
            });
          this.setEntities(entities);
          subscriber.next();
          subscriber.complete();
        });
    });
  }
}
