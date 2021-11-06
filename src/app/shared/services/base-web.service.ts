import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class BaseWebService {
  constructor(private http: HttpClient) {}

  getRequest<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      map((res) => {
        return res as T;
      })
    );
  }

  getRequestForArray<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url).pipe(
      map((res) => {
        return res as T[];
      })
    );
  }

  postRequest<T>(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data).pipe(
      map((res) => {
        return res as T;
      })
    );
  }

  putRequest<T>(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data).pipe(
      map((res) => {
        return res as T;
      })
    );
  }

  deleteRequest<T>(url: string): Observable<T> {
    // need to add body params to DELETE request because backend is not completely in RESTful standard
    return this.http.delete<T>(url).pipe(
      map((res) => {
        return res as T;
      })
    );
  }
}
