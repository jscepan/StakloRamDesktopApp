import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionManager } from '../../shared/services/subscription.manager';
import { MODE } from '../components/me-basic-alert/me-basic-alert.interface';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  public subs: SubscriptionManager = new SubscriptionManager();

  constructor(
    // private globalService: GlobalService,
    private translateService: TranslateService
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // this.globalService.showBasicAlert(
        //   MODE.error,
        //   this.translateService.instant('error'),
        //   this.translateService.instant('someErrorHappened')
        // );
        return throwError('errorMsg');
      })
    );
  }
}
