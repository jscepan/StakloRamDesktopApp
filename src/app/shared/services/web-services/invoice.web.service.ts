import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceModel } from '../../models/invoice-model';
import { BaseWebService } from './base-web.service';
import { EntityBaseWebService } from './entity-base-web.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceWebService extends EntityBaseWebService<InvoiceModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'invoices');
  }

  searchEntities(buyerName: string): Observable<InvoiceModel[]> {
    return this.baseWebService.getRequestForArray<InvoiceModel>(
      this.domainName
    );
  }
}
