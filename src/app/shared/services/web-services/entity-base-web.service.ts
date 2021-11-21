import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseWebService } from './base-web.service';

@Injectable({
  providedIn: 'root',
})
export abstract class EntityBaseWebService<T> {
  private URL_PREFIX: string = 'http://localhost:44563/';

  constructor(
    public baseWebService: BaseWebService,
    @Inject('') public domainName: string
  ) {}

  getEntities(): Observable<T[]> {
    return this.baseWebService.getRequestForArray<T>(
      this.URL_PREFIX + this.domainName
    );
  }

  getEntityByOid(oid: string): Observable<T> {
    return this.baseWebService.getRequest<T>(
      this.URL_PREFIX + this.domainName + '/' + oid
    );
  }

  createEntity(data: T): Observable<T> {
    return this.baseWebService.postRequest<T>(
      this.URL_PREFIX + this.domainName,
      data
    );
  }

  updateEntity(data: T): Observable<T> {
    return this.baseWebService.putRequest<T>(
      this.URL_PREFIX + this.domainName,
      data
    );
  }

  deleteEntity(data: T): Observable<void> {
    console.log(data);
    return this.baseWebService.deleteRequest<void>(
      this.URL_PREFIX + this.domainName
    );
  }
}
