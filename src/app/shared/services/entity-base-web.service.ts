import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseWebService } from './base-web.service';

@Injectable({
  providedIn: 'root',
})
export abstract class EntityBaseWebService<T> {
  constructor(
    public baseWebService: BaseWebService,
    @Inject('') public domainName: string
  ) {}

  createEntity(data: T): Observable<T> {
    return this.baseWebService.postRequest<T>(this.domainName, data);
  }

  updateEntity(data: T): Observable<T> {
    return this.baseWebService.putRequest<T>(this.domainName, data);
  }

  deleteEntity(data: T): Observable<void> {
    console.log(data);
    return this.baseWebService.deleteRequest<void>(this.domainName);
  }
}
