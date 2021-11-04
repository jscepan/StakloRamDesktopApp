import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseWebService {
  getRequest<T>(): Observable<T> {
    return;
  }
}
